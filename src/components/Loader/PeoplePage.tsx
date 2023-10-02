import React, { useContext } from 'react';
import { PeopleContext } from '../../PeopleContext';
import { ErrorMessages } from '../../types/ErrorMessages';
import { Loader } from '.';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const { peopleList, isLoading, errorMessage } = useContext(PeopleContext);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (<Loader />)}

          {errorMessage === ErrorMessages.LoadError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {ErrorMessages.SomethingWentWrong}
            </p>
          )}

          {(!peopleList.length && !isLoading) && (
            <p data-cy="noPeopleMessage">
              {ErrorMessages.NoPeople}
            </p>
          )}

          {!!peopleList.length && (
            <PeopleTable />
          )}
        </div>
      </div>
    </>
  );
};
