import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const isErrorPresent = !isLoading && errorMessage;
  const isDataEmpty = !isLoading && !people.length;
  const isPeopleAvailable = !isLoading && people.length !== 0;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isErrorPresent && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {isDataEmpty && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {isPeopleAvailable && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
