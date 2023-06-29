import {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { ErrorTypes } from '../constants';
import { Loader } from '../components/Loader';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorType, setErrorType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getPeopleFromServer = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getPeople();

      if (!response.length) {
        setErrorType(ErrorTypes.NOPEOPLE);
      }

      setPeople(response);
    } catch (error) {
      setErrorType(ErrorTypes.UPLOAD);
    } finally {
      setIsLoading(false);
    }
  }, [people]);

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && (
        <Loader />
      )}

      {(people && !errorType) ? (
        <PeopleTable
          people={people}
          isLoading={isLoading}
        />
      ) : (
        <div className="block">
          <div className="box table-container">
            { errorType === ErrorTypes.UPLOAD
              ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
          </div>
        </div>
      )}
    </>
  );
};
