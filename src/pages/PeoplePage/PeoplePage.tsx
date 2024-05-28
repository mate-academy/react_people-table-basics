import React from 'react';

import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { usePeople } from './usePeople';

export const PeoplePage: React.FC = () => {
  const { people, isLoading, hasError } = usePeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!!people.length && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
