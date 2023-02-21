import React, { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { Errors, getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader/Loader';
import { PeopleTable } from './Peopletable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorLoading, setErrorLoading] = useState('');
  const match = useMatch('/people/:personSlug');
  const personSlugSelected = match?.params.personSlug;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((peopleData) => {
        setPeople(peopleData);
        setIsLoaded(true);
      })
      .catch(() => {
        setErrorLoading(Errors.LOADING);
        setIsLoaded(false);
      })
      .finally(() => (
        setIsLoading(false)
      ));
  }, []);

  const shouldShowTable = !isLoading
    && isLoaded
    && !errorLoading
    && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {errorLoading && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              {errorLoading}
            </p>
          )}
          {isLoading && (<Loader />)}

          {isLoaded && people.length === 0
            && (
              <p
                data-cy="noPeopleMessage"
              >
                {Errors.EMPTY}
              </p>
            )}
          {shouldShowTable && (
            <PeopleTable
              people={people}
              personSlugSelected={personSlugSelected}
            />
          )}
        </div>
      </div>
    </>
  );
};
