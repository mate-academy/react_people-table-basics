import { useState, useEffect } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [isLoadin, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const isEmptyPeople = peopleFromServer.length === 0 && !isLoadin;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeopleFromServer)
      .catch(() => {
        setErrorMessage(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(false);
      }, 3000);
    }
  }, [errorMessage]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoadin ? (
            <Loader />
          ) : (
            <>
              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isEmptyPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              <PeopleTable people={peopleFromServer} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
