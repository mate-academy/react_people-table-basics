import { useEffect, useState } from 'react';

import { PeopleTable } from './PersonList/PeopleTable';
import { Loader } from './Loader';
import { Person } from '../types';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams<{ slug?: string }>();

  useEffect(() => {
    setLoading(true);

    const startTime = Date.now();

    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch people');
        }

        return res.json();
      })
      .then(data => {
        setPeople(data);
        setError(null);
      })
      .catch(err => setError(err.message))
      .finally(() => {
        const elapsed = Date.now() - startTime;
        const delay = Math.max(500 - elapsed, 0);

        setTimeout(() => setLoading(false), delay);
      });
  }, []);

  if (loading) {
    return (
      <div className="block">
        <div className="box table-container" data-cy="loader">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="has-text-danger" data-cy="peopleLoadingError">
        Error: {error}
      </p>
    );
  }

  if (!loading && people.length === 0 && !error) {
    return <p data-cy="noPeopleMessage">No people found.</p>;
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable people={people} selectedSlug={slug} />
    </>
  );
};
