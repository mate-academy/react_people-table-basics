import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';
import { getPeopleWithParents } from '../utils/utils';

export const People: React.FC = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const data = await getPeople();

        if (Array.isArray(data)) {
          setPeopleFromServer(getPeopleWithParents(data));
        }
      } catch {
        setError('ERROR');
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {peopleFromServer.length === 0 && error === null && <Loader />}

          {error === 'ERROR' && (
            <>
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>

              <p data-cy="noPeopleMessage">There are no people on the server</p>
            </>
          )}

          {peopleFromServer.length > 0 && (
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
                {Array.isArray(peopleFromServer) &&
                  peopleFromServer.map(person => (
                    <PersonLink person={person} key={person.name} />
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
