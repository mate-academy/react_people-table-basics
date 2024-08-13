import React, { useEffect } from 'react';
import { Loader } from './Loader';
import { useValues } from '../PeopleContext';
import { Table } from './Table';

export const PeoplePage: React.FC = () => {
  const { people, isLoading, isError, fetchPeople } = useValues();

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <div className="block">
        <h1 className="title">People Page</h1>

        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && !isLoading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {}
            </p>
          )}

          {!people.length && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!!people.length && !isLoading && <Table />}
        </div>
      </div>
    </>
  );
};
