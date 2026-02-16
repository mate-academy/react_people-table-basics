import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../../types';
import { getPeople } from '../../../api';
import { useParams } from 'react-router-dom';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(data => setPeoples(data))
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
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
              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {peoples.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              <PeopleTable peoples={peoples} slug={slug} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
