import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonLink } from '../Person/Person';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const peopleId = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setHasError(false);

        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch (err) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        {hasError ? (
          <tr>
            <td
              className="has-text-danger"
              data-cy="peopleLoadingError"
            >
              Something went wrong
            </td>
          </tr>
        ) : (
          <>
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                <table
                  data-cy="peopleTable"
                  className="table is-striped is-hoverable
                            is-narrow is-fullwidth"
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
                    {people.length === 0 ? (
                      <tr>
                        <td colSpan={6} data-cy="noPeopleMessage">
                          There are no people on the server
                        </td>
                      </tr>
                    ) : (
                      people.map((person) => {
                        const hasMother = people
                          .find(({ name }) => name === person.motherName)
                          || null;
                        const hasFather = people
                          .find(({ name }) => name === person.fatherName)
                          || null;

                        return (
                          <tr
                            key={person.slug}
                            className={classNames({
                              'has-background-warning': peopleId.pathname === `/people/${person.slug}`,
                            })}
                          >
                            <PersonLink
                              person={person}
                              hasMother={hasMother}
                              hasFather={hasFather}
                            />
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
