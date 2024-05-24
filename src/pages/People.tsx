import { useEffect, useState } from 'react';

import { Loader, PeopleTable } from '../components';

import { Person } from '../types';

import { getPeople } from '../api';

import { getPeopleWithParents } from '../helpers/getPeopleWithParents';

export const People = () => {
  const [hasErrors, setHasErrors] = useState(false);

  const [people, setPeople] = useState<Person[] | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  console.log('people', people);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        setPeople(getPeopleWithParents(data));
      })
      .catch(err => {
        setHasErrors(true);
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {hasErrors ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : !isLoading ? (
            people?.length! > 0 ? (
              <PeopleTable people={people} />
            ) : (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
};
