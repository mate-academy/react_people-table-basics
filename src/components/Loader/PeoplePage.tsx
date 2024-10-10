import { useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';
import { Loader } from './Loader';
import { useEffect } from 'react';

import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [loader, setLoader] = useState(true);
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setLoader(true);
        const data = await getPeople();
        setPeople(data);
      } catch (er) {
        setError('Something went wrong');
      } finally {
        setLoader(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <div>
      <h1 className="title">People Page</h1>

      {error && (
        <div className="block">
          <div className="box table-container">
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          </div>
        </div>
      )}

      {loader ? (
        <Loader />
      ) : (
        <>
          {!people?.length && !error ? (
            <p data-cy="noPeopleMessage">No people found</p>
          ) : (
            <PeopleTable persons={people} />
          )}
        </>
      )}
    </div>
  );
};
