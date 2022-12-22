import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const { slug = '' } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchPeople = async () => {
    try {
      setIsLoading(true);
      setPeople(await getPeople());
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {hasError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!isLoading && !people.length && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}

      {isLoading
        ? <Loader />
        : (
          <PeopleTable
            people={people}
            slug={slug}
          />
        )}
    </>
  );
};
