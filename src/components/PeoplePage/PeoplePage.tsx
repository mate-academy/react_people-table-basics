import React, { useEffect } from 'react';
import classNames from 'classnames';
import { NavLink, useParams } from 'react-router-dom';
import { useTableContext } from '../Context/Context';
import { client } from '../../utils/fetchClient';
import { Person } from '../../types';
import { Loader } from '../Loader';

export const PeoplePage: React.FC = () => {
  const {
    peoples,
    setPeoples,
    hasError,
    setHasError,
    isLoading,
    setIsLoading,
  } = useTableContext();

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);

    client.get('people.json')
      .then((response: unknown) => {
        setPeoples(response as Person[]);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {peoples?.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
          {!isLoading && (
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
                {peoples?.map(people => {
                  const isActive = slug === people.slug;
                  const trClassName = isActive ? 'has-background-warning' : '';

                  return (
                    <tr
                      data-cy="person"
                      key={people.slug}
                      className={trClassName}
                    >
                      <td>
                        <NavLink
                          to={`${people.slug}`}
                          className={classNames(
                            {
                              'has-text-danger': people.sex === 'f',
                            },
                          )}
                        >
                          {people.name}
                        </NavLink>
                      </td>

                      <td>{people.sex}</td>
                      <td>{people.born}</td>
                      <td>{people.died}</td>
                      {peoples.find(mother => {
                        return mother.name === people.motherName;
                      }) ? (
                          peoples.map(mother => {
                            if (mother.name === people.motherName) {
                              return (
                                <td>
                                  <NavLink
                                    to={`${mother.slug}`}
                                    className="has-text-danger"
                                  >
                                    {mother.name}
                                  </NavLink>
                                </td>
                              );
                            }

                            return null;
                          })
                        ) : (
                          <td>{people.motherName ? people.motherName : '-'}</td>
                        )}

                      {peoples.find(father => {
                        return father.name === people.fatherName;
                      }) ? (
                          peoples.map(father => {
                            if (father.name === people.fatherName) {
                              return (
                                <td>
                                  <NavLink
                                    to={`${father.slug}`}
                                  >
                                    {father.name}
                                  </NavLink>
                                </td>
                              );
                            }

                            return null;
                          })
                        ) : (
                          <td>{people.fatherName ? people.fatherName : '-'}</td>
                        )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
