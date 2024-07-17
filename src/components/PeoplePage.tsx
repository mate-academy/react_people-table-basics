import React, { FC, useContext } from 'react';
import { Loader } from './Loader';
import { PeoplesContext } from '../store/PeopleProvider';

import { PeopleTable } from './PeopleTable';

export const PeoplePage: FC = () => {
  const { persons, loading, errorMessage } = useContext(PeoplesContext);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!persons.length && !errorMessage && !loading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && <PeopleTable persons={persons} />}
        </div>
      </div>
    </>
  );
};
