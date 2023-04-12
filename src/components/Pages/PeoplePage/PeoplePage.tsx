import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getPeople } from '../../../api';

import { Person } from '../../../types/Person';
import { ErrorType } from '../../../types/ErrorType';

import { Loader } from '../../Loader';
import { PeopleTable } from '../../PeopleTable';

export const PeoplePage: React.FC = () => {
  const { slug = '' } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<ErrorType>(ErrorType.NONE);
  const [isLoaded, setIsLoaded] = useState(false);

  const getPeopleFromServer = async () => {
    try {
      setIsLoaded(true);
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setError(ErrorType.UPLOAD_ERROR);
    } finally {
      setIsLoaded(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoaded && (
            <Loader />
          )}

          {error !== ErrorType.NONE && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}

          {!isLoaded && !people.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {error === ErrorType.NONE && people.length > 0 && (
            <PeopleTable
              people={people}
              selectedPerson={slug}
            />
          )}
        </div>
      </div>
    </>
  );
};
