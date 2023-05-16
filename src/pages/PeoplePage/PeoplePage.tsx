import React, { useState, useEffect } from 'react';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPeople().then((res) => {
      setPeople(res);
    })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading
        ? <Loader />
        : (
          <>
            {isError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}
            {!people.length ? (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )
              : (
                <PeopleTable
                  people={people}
                />
              )}
          </>
        )}
    </>
  );
};
