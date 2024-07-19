import React, { useEffect, useMemo, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person as PersonType } from '../types';
import { getPeople } from '../api';
import { Person } from '../components/Person/Person';
import { getPeopleWithParents } from '../helpers';

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<PersonType[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleWithParents = useMemo(
    () => getPeopleWithParents(people),
    [people],
  );

  return (
    <React.Fragment>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!peopleWithParents.length && !error && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!!peopleWithParents.length && (
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
                {peopleWithParents.map(person => (
                  <Person person={person} key={person.name} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
