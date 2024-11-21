import React from 'react';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

type Props = {
  people: Person[];
  error: boolean;
  loading: boolean;
};

export const People: React.FC<Props> = ({ people, error, loading }) => {
  return (
    <div className="block">
      <div className="box table-container">
        {loading && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!loading &&
          !error &&
          (people.length > 0 ? (
            <PeopleTable people={people} />
          ) : (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ))}
      </div>
    </div>
  );
};
