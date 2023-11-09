import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadPeople = async () => {
    setLoading(true);

    try {
      const response = await getPeople();

      setPeople(response);
      setLoading(false);
    } catch {
      setIsError(true);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {loading
              ? <Loader />
              : <PeopleTable people={people} />}

            {isError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {!people.length && !loading && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

          </div>
        </div>
      </div>
    </main>
  );
};
