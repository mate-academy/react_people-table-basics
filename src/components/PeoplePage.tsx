import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { NoPeopleError } from './NoPeopleError';
import { Loader } from './Loader';
import { PeopleLoadingError } from './PeopleLoadingError';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        setLoading(true);
        setPeople(peopleFromServer);
      })
      .catch((error) => {
        setShowError(true);
        throw error;
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {loading ? (
          <Loader />
        ) : (
          <>
            {showError && (
              <PeopleLoadingError />
            )}

            {people.length === 0 && !loading && (
              <NoPeopleError />
            )}

            <PeopleTable people={people} />
          </>
        )}
      </div>
    </div>
  );
};
