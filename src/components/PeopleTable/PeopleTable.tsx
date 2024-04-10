import React from 'react';
import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { TableList } from '../TableList';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const isPeopleEmpty = !people.length;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container">
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !isError && isPeopleEmpty && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isPeopleEmpty && <TableList people={people} />}
        </div>
      </div>
    </div>
  );
};
