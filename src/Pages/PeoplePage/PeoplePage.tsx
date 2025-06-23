import React from 'react';
import { Loader } from '../../components/Loader';
import { usePeopleList } from '../../hooks/usePeopleList';
import { ErrorMessage } from '../../types/ErrorMessage';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const { peopleList, errorMessage, isLoading } = usePeopleList();

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage === ErrorMessage.Unknown && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {errorMessage === ErrorMessage.NoPeopleOnServer && (
            <p data-cy="noPeopleMessage">{errorMessage}</p>
          )}

          {peopleList.length > 0 && <PeopleTable peopleList={peopleList} />}
        </div>
      </div>
    </div>
  );
};
