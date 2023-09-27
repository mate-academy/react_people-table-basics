import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleList } from '../PeopleList/PeopleList';
import { getFixedPeople } from '../../utils/PeopleUtils';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(currentPeople => {
        setPeople(getFixedPeople(currentPeople));
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {(isError && !isLoading) && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(!people.length && !isLoading && !isError) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {(!!people.length && !isError) && (
            <PeopleList people={people} />
          )}
        </div>
      </div>
    </>
  );
};
