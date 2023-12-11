import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [data, setData] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { people } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setData)
      .catch(() => setHasError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, [people]);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {isLoading && <Loader />}

        {hasError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!isLoading && (
          !data.length ? (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          ) : <PeopleTable people={data} />
        )}
      </div>
    </div>
  );
};
