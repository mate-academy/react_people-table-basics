import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const peopleFromServer = async () => {
      try {
        const data = await getPeople();

        setPeople(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    peopleFromServer();
  }, []);

  return (
    <div className="block">
      <h1 className="title">
        People Page
      </h1>
      <div className="box table-container">
        {isLoading && <Loader />}
        {error && <p className="has-text-danger">Something went wrong</p>}
        {!isLoading && people.length < 1 && !error && (
          <p>There are no people on the server</p>
        )}

        {people && people.length > 0 && <PeopleTable people={people} />}

      </div>
    </div>
  );
};
