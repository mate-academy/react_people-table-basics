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

  const TABLE_THS = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

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

  const showNoPeopleMessage = !peopleWithParents.length && !error && !isLoading;

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

          {showNoPeopleMessage && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!!peopleWithParents.length && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {TABLE_THS.map(th => (
                    <th key={th}>{th}</th>
                  ))}
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
