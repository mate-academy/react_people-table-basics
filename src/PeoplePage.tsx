import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { getPeople } from './api';
import { Person } from './types';
import PersonTable from './components/PersonTable';

const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [database, setDatabase] = useState<Person[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getPeople()
      .then(data => setDatabase(data))
      .catch(err => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>
        <main className="section">
          <div className="container">
            <div className="block">
              <div className="box table-container">
                {isLoading && <Loader />}

                {error.length !== 0 && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {!isLoading && error.length === 0 && database.length === 0 && (
                  <p data-cy="noPeopleMessage">There are no people</p>
                )}

                {!isLoading && database.length > 0 && (
                  <PersonTable database={database} />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </main>
  );
};

export default PeoplePage;
