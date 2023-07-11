import { FC, useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api/api';
import { PeopleTable } from '../components/PeopleTable';
import { getProcessPeople } from '../helpers';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const processedPeople = getProcessPeople(people);

  const showNoPeopleMessage = !people.length && !isError && !isLoading;
  const showPeopleTable = people.length > 0 && !isError && !isLoading;
  const showPeopleLoadingError = !people.length && isError && !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {showPeopleLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {showNoPeopleMessage && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {showPeopleTable && (
            <PeopleTable people={processedPeople} />
          )}
        </div>
      </div>
    </>
  );
};
