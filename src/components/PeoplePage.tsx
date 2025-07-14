import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const { slug } = useParams();

  const isServerEmpty = !people.length && !isLoading && !loadingError;

  const personToHighlight =
    people?.find(person => person.slug === slug) || null;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {loadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isServerEmpty && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people && people.length !== 0 && (
            <PeopleTable
              people={people}
              personToHighlight={personToHighlight}
            />
          )}
        </div>
      </div>
    </>
  );
};
