import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { slug = '' } = useParams();

  const fetchPeople = useCallback(async () => {
    setIsLoading(true);

    try {
      const loadedPeople = await getPeople();

      setIsLoading(false);
      setPeople(loadedPeople);
    } catch (error) {
      setHasError(true);
    }
  }, []);

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {hasError
          ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )
          : (
            <>
              {isLoading
                ? (
                  <Loader />
                )
                : (
                  <PeopleTable people={people} slug={slug} />
                )}
            </>
          )}
      </div>
    </div>
  );
};
