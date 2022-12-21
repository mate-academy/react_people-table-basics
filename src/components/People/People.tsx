import { useCallback, useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const People: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadError, setIsLoadError] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [serverHasData, setServerHasData] = useState(true);
  const [people, setPeople] = useState<Person []>([]);

  const getPeopleFromServer = useCallback(async () => {
    try {
      const peopleFromServer = await getPeople();

      if (!peopleFromServer.length) {
        setServerHasData(false);
      }

      setIsLoading(false);
      setPeople(peopleFromServer);
    } catch (err) {
      setIsLoadError(true);
      if (err instanceof Error) {
        setIsLoading(false);
        setLoadError(err.message);
      }
    }
  }, [people]);

  useEffect(() => {
    setIsLoading(true);
    getPeopleFromServer();
    // setIsLoading(true);

    // const peopleFromServer = getPeople();

    // peopleFromServer.then((response) => {
    //   if (!response.length) {
    //     setServerHasData(false);
    //   }

    //   setPeople(response);
    //   setIsLoading(false);

    //   setIsLoadError(false);
    //   setLoadError('');
    // });
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isLoadError && (
            <>
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
              <p>
                Error:
                {loadError}
              </p>
            </>
          )}

          {!serverHasData && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isLoading && !isLoadError && serverHasData && (
            <PeopleTable
              people={people}
            />
          )}
        </div>
      </div>
    </div>
  );
};
