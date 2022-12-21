import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Link, useParams } from 'react-router-dom';

import { Loader } from '../Loader';

import { getPeople } from '../../api';

import { Person } from '../../types';

export const Table = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [peoplesError, setPeoplesError] = useState(false);

  const { selectedPersone } = useParams();

  useEffect(() => {
    getPeople()
      .then((peopleList: Person[]) => {
        setPeople(peopleList);
      })
      .catch(() => {
        setPeople([]);
        setPeoplesError(true);
      });
  }, []);

  const getPersoneInfo = (persone: Person) => `${persone.name.toLowerCase().split(' ').join('-')}-${persone.born}`;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        {people
          ? (peoplesError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )) || (
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

              {people?.length === 0
                ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : (
                  <tbody>
                    {people.map((persone) => {
                      const {
                        name,
                        sex,
                        born,
                        died,
                        motherName,
                        fatherName,
                      } = persone;

                      const father = people
                        .find(person => person.name === fatherName);
                      const mother = people
                        .find(person => person.name === motherName);

                      return (
                        <tr
                          data-cy="person"
                          key={name}
                          className={classNames(
                            { 'has-background-warning': selectedPersone === `${getPersoneInfo(persone)}` },
                          )}
                        >
                          <td>
                            <Link
                              to={`${getPersoneInfo(persone)}`}
                              className={classNames(
                                { 'has-text-danger': sex === 'f' },
                              )}
                            >
                              {name}
                            </Link>
                          </td>

                          <td>{sex}</td>
                          <td>{born}</td>
                          <td>{died}</td>
                          {
                            mother
                              ? (
                                <td>
                                  <Link
                                    to={`${getPersoneInfo(mother)}`}
                                    className="has-text-danger"
                                  >
                                    {motherName || '-'}
                                  </Link>
                                </td>
                              )
                              : <td>{motherName || '-'}</td>
                          }
                          {
                            father
                              ? (
                                <td>
                                  <Link
                                    to={`${getPersoneInfo(father)}`}
                                  >
                                    {fatherName || '-'}
                                  </Link>
                                </td>
                              )
                              : <td>{fatherName || '-'}</td>
                          }
                        </tr>
                      );
                    })}
                  </tbody>
                )}
            </table>
          )
          : <Loader />}
      </div>
    </>
  );
};
