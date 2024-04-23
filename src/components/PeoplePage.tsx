import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { useEffect, useState } from 'react';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [noPeople, setNoPeople] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(people => {
        if (!people.length) {
          setNoPeople(true);
        } else {
          setPeopleFromServer(people);
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          <div>
            {loading && <Loader />}

            {error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {noPeople && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}
          </div>

          {!noPeople && !error && !loading && (
            <PeopleTable people={peopleFromServer} />
          )}
        </div>
      </div>
    </div>
  );
};
