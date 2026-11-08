import React, { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../api/people';
import { PeopleTable } from '../components/Loader/PeopleTable';
import { Loader } from '../components/Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(fetchedPeople => {
        setPeople(fetchedPeople);
        setIsError(false); // Явно гарантуємо, що помилки немає
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {isError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!isLoading && !isError && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!isLoading && !isError && people.length > 0 && (
        <div className="block">
          <div className="box table-container">
            <PeopleTable people={people} />
          </div>
        </div>
      )}
    </>
  );
};
