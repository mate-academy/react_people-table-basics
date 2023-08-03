import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';

export const People = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {(!people && !isError) && (
            <Loader />
          )}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(people && !people?.length) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people && (
            <PeopleTable
              people={people}
            />
          )}
        </div>
      </div>
    </>
  );
};
