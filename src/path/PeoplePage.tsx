import { useEffect, useState } from 'react';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, [setIsLoading]);

  return (
    <div className="container">
      <div className="block">
        <div className="box table-container">
          <h1 className="title">People Page</h1>

          {isLoading && (<Loader />)}

          {!isLoading && (<PeopleTable people={people} />)}
          {!isLoading && !!errorMessage && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
