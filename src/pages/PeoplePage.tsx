import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { ErrorNotification } from '../components/ErrorNotification';
import { NoPeople } from '../components/NoPeople';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
          ) : (
            <>
              {error ? (
                <ErrorNotification />
              ) : (
                <>
                  {people.length === 0 ? (
                    <NoPeople />
                  ) : (
                    <PeopleTable people={people} />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
