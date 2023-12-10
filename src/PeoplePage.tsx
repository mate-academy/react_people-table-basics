import React, { useEffect, useState } from 'react';
import { Loader } from './components/Loader';
import { Person } from './types';
import { getPeople } from './api';
import { PersonLink } from './PersonLink';

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {isLoading && <Loader />}

            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>

            {!people.length && !isLoading && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

            <PersonLink
              people={people}
            />
          </div>
        </div>
      </div>
    </>
  );
};
