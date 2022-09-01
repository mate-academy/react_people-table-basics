import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader/Loader';

export const PeopleList: React.FC = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [notFoundPeople, setNotFoundPeople] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getPeople()
      .then(res => {
        setPeople(res);
        if (res.length === 0) {
          setNotFoundPeople('There are no people on the server');
        }
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleWithLinks = useMemo(
    () => people.map(person => {
      const newPerson = { ...person };
      const mother = people.find(mom => (
        mom.name === newPerson.motherName));
      const father = people.find(dad => (
        dad.name === newPerson.fatherName));

      if (mother) {
        newPerson.mother = mother;
      }

      if (father) {
        newPerson.father = father;
      }

      return newPerson;
    }),
    [people],
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {(notFoundPeople !== '')
          && (
            <p data-cy="noPeopleMessage">
              {notFoundPeople}
            </p>
          )}

          {(error !== '')
            && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {error}
              </p>
            )}

          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Sex</th>
                <th>Born</th>
                <th>Died</th>
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {peopleWithLinks.map(person => (
                <tr
                  data-cy="person"
                  key={person.slug}
                  className={classNames(
                    { 'has-background-warning': person.slug === slug },
                  )}
                >
                  <td>
                    <Link
                      className={classNames(
                        { 'has-text-danger': person.sex === 'f' },
                      )}
                      to={`../${person.slug}`}
                    >
                      {person.name}
                    </Link>
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {person.mother
                      ? (
                        <Link
                          to={`../${person.mother.slug}`}
                          className="has-text-danger"
                        >
                          {person.mother.name}
                        </Link>
                      )
                      : person.motherName || '-'}
                  </td>

                  <td>
                    {person.father
                      ? (
                        <Link
                          to={`../${person.father.slug}`}
                        >
                          {person.father.name}
                        </Link>
                      )
                      : person.fatherName || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
