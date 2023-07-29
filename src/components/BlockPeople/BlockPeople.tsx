import React from 'react';
import { Loader } from '../Loader';
import { Table } from '../Table/Table';
import { Person } from '../../types';

export enum ErrorTypes {
  Api = 'Something went wrong',
  NotData = 'There are no people on the server',
}

type Props = {
  persons: Person[]
  loading: boolean
  error: ErrorTypes | null
};

export const BlockPeople: React.FC<Props> = ({
  persons,
  loading,
  error,
}) => {
  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {
            error === ErrorTypes.Api
            && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {ErrorTypes.Api}
              </p>
            )
          }

          {
            error === ErrorTypes.NotData
            && (
              <p data-cy="noPeopleMessage">
                {ErrorTypes.NotData}
              </p>
            )
          }

          <Table
            persons={persons}
          />

        </div>
      </div>
    </>
  );
};
