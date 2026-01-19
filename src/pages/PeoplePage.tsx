import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPeople, Person } from '../api/peopleApi';
import PeopleTable from '../components/PeopleTable';
import Loader from '../components/Loader';

const PeoplePage: React.FC = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div data-cy="app" style={{ position: 'relative' }}>
      <h1 className="title">People Page</h1>

      {loading ? (
        <Loader data-cy="loader" />
      ) : error ? (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {error}
        </p>
      ) : people.length > 0 ? (
        <PeopleTable people={people} selectedSlug={slug} />
      ) : (
        <p data-cy="noPeopleMessage">Немає людей</p>
      )}
    </div>
  );
};

export default PeoplePage;
