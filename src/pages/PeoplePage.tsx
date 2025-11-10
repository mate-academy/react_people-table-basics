import { FC, useEffect, useState } from 'react';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    const loadPeople = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getPeople();

        setPeople(data);
      } catch {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {loading && <Loader />}
        {error && (
          <p className="has-text-danger" data-cy="peopleLoadingError">
            {error}
          </p>
        )}
        {!loading && !error && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!loading && !error && people.length > 0 && (
          <PeopleTable people={people} selectedSlug={slug} />
        )}
      </div>
    </>
  );
};
