import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [people, setPeople] = useState<Person[]>([]);

  const fetchPeople = async () => {
    try {
      setLoading(true);
      const data = await getPeople();

      setPeople(data);
    } catch {
      setErrorMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {loading && <Loader />}

            {errorMessage && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {errorMessage}
              </p>
            )}

            {!loading && people.length === 0 && !errorMessage && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!loading && people.length > 0 && <PeopleTable people={people} />}
          </div>
        </div>
      </div>
    </main>
  );
};
