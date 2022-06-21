import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { PersonRow } from './PersonRow';

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
          <table className="table is-bordered">
            <tr>
              <th>Name</th>
              <th>Sex</th>
              <th>Born</th>
              <th>Died</th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
            {people.map((person) => {
              return (
                <PersonRow person={person} />
              );
            })}
          </table>
        </div>
      ) : (
        <h2>{error}</h2>
      )}
    </>
  );
};
