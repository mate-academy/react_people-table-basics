import React, { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../api/people';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!isLoading && !errorMessage && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !errorMessage && people.length > 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
