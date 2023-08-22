import React, { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { getVisiblePeople } from '../helpers';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);

      try {
        const response = await getPeople();

        setPeople(response);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(`Something went wrong: ${error.message}`);
        }
      }

      setIsLoading(false);
    };

    fetchPeople();
  }, []);

  const visiblePeople = getVisiblePeople(people);

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
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {visiblePeople.length > 0 && <PeopleTable people={visiblePeople} />}
        </div>
      </div>
    </>
  );
};
