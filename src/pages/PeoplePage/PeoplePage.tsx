import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { Person } from '../../types/Person';

export const PeoplePage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    fetch('https://mate-academy.github.io/react_people-table/api/people.json')

      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }

        return res.json();
      })
      .then((data: Person[]) => {
        if (!mounted) {
          return;
        }

        setPeople(data || []);
        setError(false);
      })
      .catch(() => mounted && setError(true))
      .finally(() => {
        setTimeout(() => mounted && setLoading(false), 100);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <h1 className="title">People Page</h1>

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
  );
};
