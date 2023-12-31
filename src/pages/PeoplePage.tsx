import React from 'react';

import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { useRequest } from '../hooks/useRequest';

export const PeoplePage: React.FC = () => {
  const [people, isLoading, error] = useRequest(getPeople);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!error && !isLoading && (
            people.length
              ? (<PeopleTable people={people} />)
              : (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )
          )}
        </div>
      </div>
    </div>
  );
};
