/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import PersonLink from './PeopleLink';

export const PeoplePage: React.FC = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const { peopleId } = useParams();

  useEffect(() => {
    setLoader(true);
    getPeople()
      .then(data => {
        if (data) {
          setPeoples(data);
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <div>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loader ? (
            <Loader />
          ) : error ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : !peoples.length ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
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
                {peoples.map(people => (
                  <tr
                    data-cy="person"
                    key={people.slug}
                    className={classNames('', {
                      'has-background-warning': peopleId === people.slug,
                    })}
                  >
                    <td>
                      <Link
                        to={`/people/${people.slug}`}
                        className={classNames({
                          'has-text-danger': people.sex === 'f',
                        })}
                      >
                        {people.name}
                      </Link>
                    </td>
                    <td>{people.sex}</td>
                    <td>{people.born}</td>
                    <td>{people.died}</td>
                    <td>
                      {people.motherName ? (
                        <>
                          {peoples.find(
                            person => person.name === people.motherName,
                          ) ? (
                            <PersonLink
                              person={peoples.find(
                                person => person.name === people.motherName,
                              )}
                            />
                          ) : (
                            people.motherName
                          )}
                        </>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td>
                      {people.fatherName ? (
                        <>
                          {peoples.find(
                            person => person.name === people.fatherName,
                          ) ? (
                            <PersonLink
                              person={peoples.find(
                                person => person.name === people.fatherName,
                              )}
                            />
                          ) : (
                            people.fatherName
                          )}
                        </>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
