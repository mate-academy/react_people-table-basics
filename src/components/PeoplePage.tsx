import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import * as peopleService from '../api';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getPeople = () => {
    setIsLoading(true);

    peopleService
      .getPeople()
      .then(ppl => {
        setPeople(ppl);
        setErrorMessage('');
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  };

  useEffect(getPeople, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !errorMessage && !people.length && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!!people.length && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
