import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';

import { PeopleTable } from '../components/Loader/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPeople();
        setPeople(data);
        setIsError(null);
      } catch {
        setIsError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const peopleLength = people.length === 0;

  const renderContent = () => {
    if (isError) {
      return (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {isError}
        </p>
      );
    }

    if (peopleLength) {
      return <p data-cy="noPeopleMessage">There are no people on the server</p>;
    }

    return <PeopleTable people={people} />;
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? <Loader /> : renderContent()}
        </div>
      </div>
    </>
  );
};
