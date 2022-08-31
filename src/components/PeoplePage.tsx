import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmptyError, setIsEmptyError] = useState(false);
  const { personSlug = '' } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(peopleFromServer => {
        if (peopleFromServer.length === 0) {
          setIsEmptyError(true);
        }

        setIsError(false);
        setPeople(peopleFromServer);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isEmptyError && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
          <PeopleTable people={people} selectedPersonSlug={personSlug} />
        </div>
      </div>
    </>
  );
};
