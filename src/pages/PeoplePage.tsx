import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import type { Person } from '../types/Person';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const { slug } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {loading && !error && <Loader />}

            {error && !loading && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {people.length === 0 && !loading && !error && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {people.length > 0 && !loading && !error && (
              <PeopleTable people={people} slug={slug} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
