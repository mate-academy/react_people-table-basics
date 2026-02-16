import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';

export const Peoples: React.FC = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');

    getPeople()
      .then(setPeoples)
      .catch(err => {
        setError('Something went wrong');

        throw err;
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
          ) : (
            <>
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {peoples.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable peoples={peoples} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
