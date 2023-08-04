import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const params = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const selected = params.slug ? params.slug : '';

  const matchMotherAndFather = (peopleFromServer: Person[]): Person[] => {
    return peopleFromServer.map((per): Person => {
      const mother = peopleFromServer.find(
        person => person.name === per.motherName,
      );

      const father = peopleFromServer.find(
        person => person.name === per.fatherName,
      );

      return { ...per, mother, father };
    });
  };

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => matchMotherAndFather(data))
      .then((data) => setPeople(data))
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {loading && (
        <Loader />
      )}
      {hasError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
      {people.length === 0 && !loading && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}
      { people.length !== 0 && !loading && (
        <div className="block">
          <div className="box table-container">
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              {!loading && (
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
              )}
              <tbody>
                {people.map(person => (
                  <tr
                    key={person.slug}
                    data-cy="person"
                    className={cn({
                      'has-background-warning': selected === person.slug,
                    })}
                  >
                    <td>
                      <Link
                        to={`/people/${person.slug}`}
                        className={cn({
                          'has-text-danger': person.sex === 'f',
                        })}
                        onClick={() => selected === person.slug}
                      >
                        {person.name}
                      </Link>
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.mother?.slug ? (
                        <Link
                          to={`/people/${person.mother?.slug}`}
                          className={cn({
                            'has-text-danger': person.motherName,
                          })}
                          onClick={() => selected === person.mother?.slug}
                        >
                          {person.mother.name}
                        </Link>
                      ) : (
                        <p>{person.motherName ? person.motherName : '-'}</p>
                      )}
                    </td>
                    <td>
                      {person.father?.slug ? (
                        <Link
                          to={`/people/${person.father?.slug}`}
                          onClick={() => selected === person.father?.slug}
                        >
                          {person.father.name}
                        </Link>
                      ) : (
                        <p>{person.fatherName ? person.fatherName : '-'}</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
