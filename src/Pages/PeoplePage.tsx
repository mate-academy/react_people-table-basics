import React from 'react';
import { usePeople } from '../hooks/usePeople';

import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const { people, isError, isLoading } = usePeople();

  const isNoPeople = !people.length && !isLoading;
  const isShowPeople = !!people.length && !isError;

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

          {isNoPeople && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {isShowPeople && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
