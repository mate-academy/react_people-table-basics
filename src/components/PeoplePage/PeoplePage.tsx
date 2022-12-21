import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';

export const PeoplePage: React.FC = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);

  const getPeopleFromServer = async () => {
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const findParent = (parentName: string | null) => {
    const parent = people.find(person => person.name === parentName);

    if (parent) {
      return (
        <Link
          to={`/people/${parent.slug}`}
          className={classnames({ 'has-text-danger': parent.sex === 'f' })}
        >
          {parent.name}
        </Link>
      );
    }

    return parentName || '-';
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  const isNoPeople = people.length === 0 && !isLoading && !isError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {isNoPeople && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length > 0 && (
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
                {people.map(person => (
                  <tr
                    key={person.slug}
                    data-cy="person"
                    className={classnames({
                      'has-background-warning': slug === person.slug,
                    })}
                  >
                    <td>
                      <Link
                        to={`/people/${person.slug}`}
                        className={classnames({
                          'has-text-danger': person.sex === 'f',
                        })}
                      >
                        {person.name}
                      </Link>
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>{findParent(person.motherName)}</td>
                    <td>{findParent(person.fatherName)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
