import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../../components/PeopleTable';
import { Loader } from '../../components/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug } = useParams();

  const getPeopleFromServer = useCallback(() => {
    getPeople()
      .then((result) => setPeople(result))
      .catch(() => setIsError(true))
      .finally(() => setIsLoaded(true));
  }, []);

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoaded
            ? (
              <PeopleTable people={people} selectedPerson={slug} />
            )
            : <Loader />}

          {isLoaded && people.length === 0 && !isError && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isLoaded && isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
        </div>
      </div>
    </>
  );
};
