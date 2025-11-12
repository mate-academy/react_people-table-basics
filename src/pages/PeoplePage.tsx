import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    setError('');

    getPeople()
      .then(setPeople)
      .catch(() => setError('Failed to load people'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <PeopleTable
        people={people}
        selectedSlug={slug}
        loading={loading}
        error={error}
      />
    </div>
  );
};
