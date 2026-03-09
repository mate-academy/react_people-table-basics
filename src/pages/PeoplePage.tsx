import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { PeopleTable } from './../components/PeopleTable/PeopleTable';
import { Person } from './../types';
import { getPeople } from './../api';
import { Loader } from './../components/Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { personSlug } = useParams();

  function loadPeople() {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
        setIsLoaded(true);
      });
  }

  useEffect(loadPeople, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && !errorMessage && people.length > 0 && (
            <PeopleTable people={people} selectedSlug={personSlug} />
          )}

          {!isLoading && isLoaded && !errorMessage && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {!isLoading && errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
