import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(error => {
        setErrorMessage(error.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const { slug } = useParams();

  const selectedPerson = people.find(per => per.slug === slug);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !errorMessage && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !errorMessage && people.length > 0 && (
            <PeopleTable people={people} selectedPerson={selectedPerson} />
          )}
        </div>
      </div>
    </>
  );
};
