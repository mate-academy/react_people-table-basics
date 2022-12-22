import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { PersonLink } from './PersonLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isloading, setIsLoading] = useState(false);
  const [hasLoadingError, setHasLoadigError] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      setHasLoadigError(false);
      setIsLoading(true);

      try {
        const peopleFromServer = await getPeople();

        setIsLoading(false);
        setPeople(peopleFromServer);
      } catch (error) {
        setIsLoading(false);
        setHasLoadigError(true);
      }
    };

    loadUsers();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isloading && <Loader />}

          {hasLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(people.length === 0 && !isloading && !hasLoadingError) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && (
            <table
              data-cy="peopleTable"
              // eslint-disable-next-line max-len
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
                  <PersonLink
                    person={person}
                    people={people}
                    key={person.slug}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
