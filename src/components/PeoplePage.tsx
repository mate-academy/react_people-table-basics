import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Audio } from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import { getPeopleFromServer } from '../api/api';
import { PeopleTable } from './PersonTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPeople = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const peopleFromServer: Person[] = await getPeopleFromServer();

        setPeople(peopleFromServer);
        setIsLoading(false);
        setHasError(false);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getPeople();
  }, []);

  return (
    <div>
      <h2 className="subtitle is-3">People Page</h2>
      {hasError && (
        <p className="error-message">
          Some problems with server. Please wait.
        </p>
      )}
      {!hasError && (isLoading
        ? <Audio color="#00BFFF" height={80} width={80} />
        : <PeopleTable people={people} />
      )}
    </div>
  );
};
