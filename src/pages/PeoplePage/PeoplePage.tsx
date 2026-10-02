import { useEffect, useState } from 'react';

import { PeopleTable } from '../../components/PeopleTable';
import { Loader } from '../../components/Loader';

import { getPeople } from '../../api';

import type { Person } from '../../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading ? <Loader /> : <PeopleTable people={people} />}

          {!isLoading && people.length <= 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
