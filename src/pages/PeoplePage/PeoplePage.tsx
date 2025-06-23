import React from 'react';
import { Loader } from '../../components/Loader';
import { usePeople } from '../../hooks/usePeople';
import { PeopleTable } from './components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const {
    people,
    isLoading,
    errorMessage,
    areThereNoPeopleFromServer,
    areTherePeopleFromServer,
  } = usePeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {areThereNoPeopleFromServer && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {areTherePeopleFromServer && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
