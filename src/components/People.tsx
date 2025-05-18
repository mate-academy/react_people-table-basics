import { Loader } from './Loader';
import { useContext, useEffect } from 'react';
import { getPeople } from '../api';
import { PersonTable } from './PersonTable';
import { PeopleContext } from '../context/PeopleContext';

export const People = () => {
  const {
    people,
    isLoading,
    errorMessage,
    setErrorMessage,
    setIsLoading,
    setPeople,
  } = useContext(PeopleContext);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');
    setPeople([]);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setErrorMessage, setIsLoading, setPeople]);

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

          {!errorMessage && people.length === 0 && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!errorMessage && people.length > 0 && !isLoading && (
            <PersonTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
