import { useState, useEffect } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { Loader } from '../../components/Loader';
import { useParams } from 'react-router-dom';
export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(null);
    getPeople()
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err?.message ?? String(err));
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (!loading && !error && people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <div>
      <h1 className="title">People Page</h1>
      <p>Loaded {people.length} people</p>
      <PeopleTable people={people} selectedSlug={slug} />
    </div>
  );
};
