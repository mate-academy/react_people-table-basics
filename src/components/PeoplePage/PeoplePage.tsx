import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState('');

  useEffect(() => {
    const fetchPeople = async () => {
      setError('');

      try {
        const data = await getPeople();

        setPeople(data);
      } catch {
        setError('something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {isError}
                </p>
              )}

              {!people?.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!people.length && <PeopleTable people={people} />}
            </>
          )}
        </div>
      </div>
    </>
  );
};
