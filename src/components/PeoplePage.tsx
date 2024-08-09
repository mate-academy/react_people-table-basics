import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PeopleTable } from './PeopleTable';
import { PersonDetails } from './PersonDetails';
import { Loader } from './Loader';

const API_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        setPeople(data);
      } catch (errorFetch) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        {error}
      </p>
    );
  }

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">no people</p>;
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <Routes>
        <Route path="/" element={<PeopleTable people={people} />} />
        <Route path=":slug" element={<PersonDetails people={people} />} />
      </Routes>
    </>
  );
};
