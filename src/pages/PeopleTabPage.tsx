import { useState, useEffect } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeopleTabPage: React.FC = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isEmpty = peopleFromServer.length === 0 && !errorMessage;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeopleFromServer)
      .catch((error) => setErrorMessage(`Something went wrong: ${error.message}`))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {isEmpty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isEmpty && (
                <PeopleTable people={peopleFromServer} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
