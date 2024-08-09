import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { TabPeople } from './TabPeople';

export const TabPage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoaging] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoaging(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => setIsLoaging(false));
  }, []);

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

          {!people.length && !isLoading ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
            ''
          )}

          {!isLoading && errorMessage === '' && <TabPeople people={people} />}
        </div>
      </div>
    </>
  );
};
