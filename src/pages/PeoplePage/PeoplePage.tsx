import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { PeopleTable } from '../../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((peopleFromServer) => setPeople(peopleFromServer))
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {
            isLoading
              ? <Loader />
              : error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )
          }

          {
            !isLoading && !people.length && !error && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )
          }

          {
            !isLoading && !!people.length && !error && (
              <PeopleTable people={people} />
            )
          }
        </div>
      </div>
    </>
  );
};
