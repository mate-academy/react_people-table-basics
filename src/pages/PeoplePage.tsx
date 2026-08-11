import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError">
        Failed to load people
      </p>
    );
  }

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      {people.length === 0 ? (
        <p data-cy="noPeopleMessage">No people</p>
      ) : (
        <PeopleTable people={people} selectedSlug={slug} />
      )}
    </div>
  );
};
