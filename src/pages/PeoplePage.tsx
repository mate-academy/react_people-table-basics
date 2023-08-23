import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleList } from '../components/PeopleList.tsx/PeopleList';
import { getParents } from '../helpers/getParents';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((peopleFromServer) => {
        setPeople(getParents(peopleFromServer));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isAnyPerson = people.length > 0;

  const isShow = {
    peopleList: !isLoading && !isError && isAnyPerson,
    noPeopleNotification: !isAnyPerson && !isLoading && !isError,
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          { isLoading && <Loader /> }

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isShow.noPeopleNotification && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isShow.peopleList
          && <PeopleList people={people} />}
        </div>
      </div>
    </>
  );
};
