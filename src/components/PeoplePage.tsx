import { useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const { personSlug = '' } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchPeople = useCallback(
    async () => {
      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
        setIsLoading(false);
      } catch {
        setHasError(true);
      }

      setIsLoading(false);
    }, [],
  );

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />)}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length > 0 && (
            <PeopleTable
              people={people}
              personSlug={personSlug}
            />
          )}
        </div>
      </div>
    </div>
  );
};
