import { FC, useEffect, useState } from 'react';

import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadPeople = async () => {
    setIsLoading(true);

    try {
      const peoplesFromServer = await getPeople();

      setPeople(peoplesFromServer.map(person => ({
        ...person,
        mother: peoplesFromServer.find(
          parent => person.motherName === parent.name,
        ),
        father: peoplesFromServer.find(
          parent => person.fatherName === parent.name,
        ),
      })));
    } catch {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !people.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isLoading && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
