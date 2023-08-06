import React, { useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function getParent(
    name: string, peopleFromServer: Person[],
  ): Person | undefined {
    return peopleFromServer.find(person => person.name === name);
  }

  useState(() => {
    setLoading(true);
    getPeople().then(peopleServer => {
      setPeople(peopleServer.map(person => ({
        ...person,
        mother: getParent(person.motherName || '', peopleServer),
        father: getParent(person.fatherName || '', peopleServer),
      })));
    })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading ? (<Loader />) : (
            <>
              {people.length === 0 && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              <PeopleTable people={people} />

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
