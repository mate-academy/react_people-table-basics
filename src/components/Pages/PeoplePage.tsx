import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { selectedSlug = '' } = useParams();

  const LoadingPeople = async () => {
    try {
      setIsLoading(true);
      const loadedPeople = await getPeople();

      setPeople(loadedPeople);
      setIsLoading(false);
    } catch {
      setIsError(true);
    }
  };

  useEffect(() => {
    LoadingPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {people.length === 0 && !isLoading
          && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isError
          && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) }

          {people.length > 0 && !isLoading
          && <PeopleTable people={people} selectedSlug={selectedSlug} />}
        </div>
      </div>
    </>
  );
};
