import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';

const API_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error('Failed to load data');
        }

        const data: Person[] = await response.json();

        setPeople(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}
      {error && <p className="has-text-danger">{error}</p>}

      {!isLoading && !error && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!isLoading && !error && people.length > 0 && (
        <PeopleTable people={people} />
      )}
    </>
  );
};
