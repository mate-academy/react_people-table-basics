import { useEffect, useState } from 'react';

import { getPeople } from '../../api';
import { Person } from '../../types';

import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isPeopleVisible, setIsPeopleVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
        setIsPeopleVisible(true);
        setError('');
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {isLoading && !error && <Loader />}

          {isPeopleVisible && (
            <>
              {people.length < 1 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable people={people} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
