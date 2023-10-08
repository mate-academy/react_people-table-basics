import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonInfo } from './PersonInfo';
import { Loader } from './Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [noPeopleMessage, setNoPeopleMessage] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((resp) => {
        setPeople(resp);

        if (resp.length === 0) {
          setNoPeopleMessage(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error
            && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

          {noPeopleMessage
            && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

          {!isLoading
            && (
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
                  {people?.map(person => {
                    return (
                      <PersonInfo
                        person={person}
                        people={people}
                        key={person.slug}
                      />
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
