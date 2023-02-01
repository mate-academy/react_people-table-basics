import React, { memo, useEffect, useState } from 'react';
import { getPeople } from '../../api';

import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);

  const loadedPeople = async () => {
    try {
      const loadPeople = await getPeople();

      setPeople(loadPeople);
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    loadedPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <main className="section">
        <div className="container">
          <div className="block">
            <div className="box table-container">

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length !== 0
                ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )
                : <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </main>
    </>
  );
});
