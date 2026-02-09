import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import type { Person } from '../types/Person';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { slug } = useParams<{ slug?: string }>();

  useEffect(() => {
    setError(false);
    setLoading(true);

    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(res => res.json())
      .then(data => {
        setPeople(data);
        setError(false);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        <h1 className="title">People Page</h1>
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
          <PeopleTable people={people} selectedSlug={slug} />
        )}
      </div>
    </div>
  );
};
