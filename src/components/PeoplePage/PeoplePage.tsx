import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonItem } from '../PersonItems/PersonItem';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {isError ? (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            ) : (
              <>
                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    {!people.length ? (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    ) : (
                      <>
                        <table
                          data-cy="peopleTable"
                          className="table
                          is-striped
                          is-hoverable is-narrow is-fullwidth"
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
                              <PersonItem
                                key={person.slug}
                                person={person}
                                people={people}
                              />
                            ))}
                          </tbody>
                        </table>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
