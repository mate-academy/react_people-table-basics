import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export function People() {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    getPeople()
      .then(response => setPeoples(response))
      .catch(() => setErrors(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {errors && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isLoading ? (
            <Loader />
          ) : (
            <>
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
}
