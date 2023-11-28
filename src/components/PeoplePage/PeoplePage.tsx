import React, { useEffect } from 'react';
import classNames from 'classnames';
import { NavLink, useParams } from 'react-router-dom';
import { useTableContext } from '../Context/Context';
import { client } from '../../utils/fetchClient';
import { Loader } from '../Loader';
import { Person } from '../../types';

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

  const renderParentsTableCell = (
    people: Person,
    peoplesArr: Person[],
    sex: string,
  ) => {
    const familyMember = peoplesArr
      .find((parent: Person) => parent.name === (sex === 'f'
        ? people.motherName
        : people.fatherName
      ));

    if (familyMember) {
      return peoplesArr.map((parent: Person) => {
        if (parent.name === (sex === 'f'
          ? people.motherName
          : people.fatherName)) {
          return (
            <td key={parent.slug}>
              <NavLink
                to={`${parent.slug}`}
                className={classNames(
                  {
                    'has-text-danger': sex === 'f',
                  },
                )}
              >
                {parent.name}
              </NavLink>
            </td>
          );
        }

        return null;
      });
    }

    if (sex === 'f') {
      return <td>{people.motherName ? people.motherName : '-'}</td>;
    }

    return <td>{people.fatherName ? people.fatherName : '-'}</td>;
  };

  useEffect(() => {
    setIsLoading(true);

    client.get('people.json')
      .then((response) => {
        if (Array.isArray(response)) {
          setPeoples(response);
        } else {
          setHasError(true);
        }
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

          {(peoples?.length === 0 && !hasError) && (
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

                  return (
                    <tr
                      data-cy="person"
                      key={people.slug}
                      className={classNames(
                        {
                          'has-background-warning': isActive,
                        },
                      )}
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
                      {renderParentsTableCell(people, peoples, 'f')}
                      {renderParentsTableCell(people, peoples, 'm')}
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
