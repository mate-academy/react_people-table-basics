import { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { PersonLink } from './PersonLink';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);

  function loadPeople() {
    setIsloading(true);

    return getPeople()
      .then(setPeople)
      .catch(() => {
        setError(true);
      })
      .finally(() => setIsloading(false));
  }

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(people.length === 0 && !isLoading) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length !== 0 && (
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
                {people.length !== 0 && (people.map(person => (
                  <PersonLink
                    person={person}
                    people={people}
                  />
                )))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>

  );
};
