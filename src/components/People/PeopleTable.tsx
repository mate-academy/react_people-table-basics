import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { PeopleList } from './PeopleList';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsTableLoading(true);
    getPeople()
      .then((peopleFromServer) => {
        setPeople(peopleFromServer);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsTableLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isTableLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people?.length && !isTableLoading && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
          {people?.length && (
            <PeopleList people={people} />
          )}

        </div>
      </div>
    </>
  );
};
