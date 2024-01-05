import { useEffect, useState } from 'react';
import { Loader } from '../components';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getNormalizedPeople } from '../helpers';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  useEffect(() => {
    getPeople()
      .then((response) => {
        const normalizedPeople = getNormalizedPeople(response);

        setPeople(normalizedPeople);
      })
      .catch(() => {
        setHasLoadingError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const isShowPeopleTable = !isLoading && !hasLoadingError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isShowPeopleTable && (
            people.length ? (
              <PeopleTable people={people} />
            ) : (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )
          )}
        </div>
      </div>
    </>
  );
};
