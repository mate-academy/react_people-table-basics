import React, { useEffect, useState } from 'react';
import { getPeople } from './api/api';
import { PeopleTable } from './PeopleTable';
// import { Person } from './react-app-env';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getPeopleFromServer = async () => {
      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch {
        setError('Cannot load a list of people');
      }
    };

    getPeopleFromServer();
  }, []);

  return (
    <>
      {error.length === 0
        ? (
          <div>
            <PeopleTable people={people} />
          </div>
        )
        : (
          <h3>{error}</h3>
        )}
    </>
  );
};
