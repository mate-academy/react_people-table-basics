import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTab } from '../components/PeopleTab';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [people, setPeople] = useState<Person[]>([]);
  const { slug } = useParams<{ slug?: string }>();

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      try {
        const result = await getPeople();

        setPeople(result);
        setError(null);
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {!isLoading && !error && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {!isLoading && !error && people.length > 0 && (
            <PeopleTab people={people} selectedSlug={slug} />
          )}
        </div>
      </div>
    </div>
  );
};
