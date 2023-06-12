import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [didError, setDidError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((peopleFromServer) => setPeople(peopleFromServer))
      .catch(() => setDidError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {didError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(!isLoading && !didError && !people.length) && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {(!isLoading && !didError && people.length) && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
