import React, { useEffect, useState } from 'react';
import { getPeople } from '../../../api';
import { Person } from '../../../types';
import { Loader } from '../../Loader';
import { PeopleTable } from '../../PeopleTable';
import { preparePeople } from '../../utils/preparedPeople';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getPeopleFromServer = async () => {
    try {
      let peopleFromServer = await getPeople();

      peopleFromServer = preparePeople(peopleFromServer);

      setIsLoading(false);
      setPeople(peopleFromServer);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  const isPeopleExist = () => {
    return people.length === 0 && !isLoading;
  };

  if (isError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {isLoading && <Loader />}

        {!!people.length && (
          <PeopleTable
            people={people}
          />
        )}

        {isPeopleExist() && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}
      </div>
    </div>
  );
};
