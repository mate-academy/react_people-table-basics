import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTableHeader } from '../components/PeopleTableHeader';
import { PeopleTableBody } from '../components/PeopleTableBody';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHasError, setIsHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setIsHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isNotPeople = !isLoading && !isHasError && people.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isHasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isNotPeople && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <PeopleTableHeader />

              <PeopleTableBody people={people} />
            </table>
          )}
        </div>
      </div>
    </>
  );
};
