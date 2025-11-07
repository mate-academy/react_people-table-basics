import { useParams } from 'react-router-dom';
import { Loader } from './Loader';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const { slug } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setError(null);

    getPeople()
      .then(data => {
        if (cancelled) {
          return;
        }

        setPeople(data);
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        setError('Something went wrong');
      })
      .finally(() => {
        if (cancelled) {
          return;
        }

        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const noPeople = !isLoading && !error && people.length === 0;
  const hasPeople = !isLoading && !error && people.length > 0;

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {isLoading && <Loader />}

            {error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {error}
              </p>
            )}

            {noPeople && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {hasPeople && <PeopleTable people={people} selectedSlug={slug} />}
          </div>
        </div>
      </div>
    </main>
  );
};
