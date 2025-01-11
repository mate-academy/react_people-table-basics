import { FC, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types/Person';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL =
    'https://mate-academy.github.io/react_people-table/api/people.json';

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = (await response.json()) as Person[];

        setPeople(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };

    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {loading && <Loader />}

      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong: {error}
        </p>
      )}

      {!loading && !error && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!loading && !error && people.length > 0 && (
        <Routes>
          <Route index element={<PeopleTable people={people} />} />

          <Route path=":slug" element={<PeopleTable people={people} />} />
        </Routes>
      )}
    </>
  );
};
