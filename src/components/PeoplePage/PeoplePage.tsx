import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function result() {
      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch {
        setError('Cannot load people');
      }
    }

    result();
  }, []);

  return (
    <>
      {error.length === 0 ? (
        <div className="People__content">
          <h2 className="title is-2">People page</h2>
          <PeopleTable people={people} />
        </div>
      ) : (
        <h2>{error}</h2>
      )}
    </>
  );
};
