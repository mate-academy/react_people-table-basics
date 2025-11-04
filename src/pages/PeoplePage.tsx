import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const byName = useMemo(() => {
    const m = new Map<string, Person>();

    people.forEach(p => m.set(p.name, p));

    return m;
  }, [people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {!loading && !error && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && !error && people.length > 0 && (
            <PeopleTable
              people={people}
              byName={byName}
              selectedSlug={slug ?? ''}
              onSelectSlug={s => navigate(`/people/${s}`)}
            />
          )}
        </div>
      </div>
    </>
  );
};
