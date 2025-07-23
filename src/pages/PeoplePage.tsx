// pages/PeoplePage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { slug } = useParams<{ slug?: string }>();

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(fetchedPeople => {
        setPeople(fetchedPeople);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && !error && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && !error && people.length > 0 && (
            <PeopleTable people={people} selectedPersonSlug={slug} />
          )}
        </div>
      </div>
    </div>
  );
};
