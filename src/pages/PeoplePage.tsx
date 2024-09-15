import React, { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { ErrorMessage } from '../types/ErrorMessage';
import { getPreparedPeople } from '../services/getPreparedPeople';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isError = !isLoading && !people.length && !errorMessage;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(ErrorMessage.TableLoadingError))
      .finally(() => setIsLoading(false));
  }, [setPeople]);

  const updatedPeople = getPreparedPeople(people);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage === ErrorMessage.TableLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {ErrorMessage.TableLoadingError}
            </p>
          )}

          {isError && (
            <p data-cy="noPeopleMessage">{ErrorMessage.TableIsEmpty}</p>
          )}

          {!!people.length && <PeopleTable people={updatedPeople} />}
        </div>
      </div>
    </div>
  );
};
