import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useParams } from 'react-router-dom';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setLoading(true);
        const peoples = await getPeople();

        setPeople(peoples);
      } catch (e) {
        setError(true);
        setPeople([]);
      } finally {
        setLoading(false);
      }
    };

    loadPeople();
  }, []);

  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {loading && <Loader />}

        {!loading && error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!loading && !error && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!loading && !error && people.length > 0 && (
          <PeopleTable people={people} selectedSlug={slug} />
        )}
      </div>
    </div>
  );
};
