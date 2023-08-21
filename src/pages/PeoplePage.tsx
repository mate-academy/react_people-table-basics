import { useState, useEffect } from 'react';

import { Loader } from '../components/Loader';
import { Person } from '../types';
import { PersonTable } from '../components/PersonTable/PersonTable';
import { getPeople } from '../api';
import { preparePeople } from '../helpers';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(response => setPeople(response))
      .catch(() => setLoadError(true))
      .finally(() => setIsLoading(true));
  }, []);

  const preparedPeople = preparePeople(people);

  const isErrorVisible = isLoading && loadError;
  const isNoPeopleVisible = !loadError && isLoading && people.length === 0;
  const isPeopleTabVisible = !loadError && isLoading && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {!isLoading && <Loader />}

          {isErrorVisible && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isNoPeopleVisible && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isPeopleTabVisible && <PersonTable people={preparedPeople} />}
        </div>
      </div>

    </>
  );
};
