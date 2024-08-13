import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Table } from './Table';
import { Person } from '../types';
import { getPeople } from '../api';
import { ErrorMessages } from '../types/ErrorMessages';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchPeople = async () => {
    setIsloading(true);

    try {
      const loadedPeople = await getPeople();

      setPeople(loadedPeople);
    } catch {
      setErrorMessage(ErrorMessages.PeopleLoadError);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <div className="block">
        <h1 className="title">People Page</h1>

        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage && !isLoading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!people.length && !isLoading && !errorMessage && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!!people.length && !isLoading && <Table people={people} />}
        </div>
      </div>
    </>
  );
};
