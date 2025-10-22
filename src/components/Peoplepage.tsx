import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const { slug: slugFromUrl } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSlug, setSelectSlug] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getPeople()
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .catch(e => {
        setError(e instanceof Error ? e.message : 'Something went wrong');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setSelectSlug(slugFromUrl ?? null);
  }, [slugFromUrl]);

  const handleRowSelect = (slug: string) => {
    setSelectSlug(slug);
    navigate(`/people/${slug}`);
  };

  const byName = useMemo(() => {
    const map = new Map<string, Person>();

    for (const p of people) {
      map.set(p.name, p);
    }

    return map;
  }, [people]);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            {loading && <Loader />}

            {error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}
            {!error && !loading && people.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!error && !loading && people.length > 0 && (
              <table
                data-cy="peopleTable"
                className="table is-striped is-hoverable is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Sex</th>
                    <th>Born</th>
                    <th>Died</th>
                    <th>Mother</th>
                    <th>Father</th>
                  </tr>
                </thead>

                <PeopleTable
                  people={people}
                  selectedSlug={selectedSlug}
                  onSelect={handleRowSelect}
                  resolveRelative={name => byName.get(name) ?? null}
                />
              </table>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
