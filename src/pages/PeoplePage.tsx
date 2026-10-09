import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types/Person';

const PEOPLE_API =
  'https://mate-academy.github.io/react_people-table/api/people.json';

export const PeoplePage = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(PEOPLE_API);

        if (!response.ok) {
          throw new Error('Failed to load people');
        }

        const data: Person[] = await response.json();

        setPeople(data);
      } catch {
        setError(true);
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
        <p className="has-text-danger" data-cy="peopleLoadingError">
          Something went wrong. Please try again.
        </p>
      )}

      {!loading && !error && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people yet</p>
      )}

      {!loading && !error && people.length > 0 && (
        <PeopleTable people={people} selectedSlug={slug} />
      )}
    </>
  );
};
