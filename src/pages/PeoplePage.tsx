import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorHappened, setIsErrorHappened] = useState(false);
  const [people, setPeople] = useState<Person[] | null>([]);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((peopleFromServer) => {
        setPeople(peopleFromServer);
      })
      .catch(() => {
        setIsErrorHappened(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const isPeopleNotExist = !isLoading && !isErrorHappened && !people?.length;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isErrorHappened && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isPeopleNotExist && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!!people?.length && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
