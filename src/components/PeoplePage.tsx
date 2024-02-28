import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [isLoadingErr, setIsLoadingErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peoplesFromServer => {
        const newPeople = peoplesFromServer.map(person => {
          const mother = peoplesFromServer.find(
            p => p.name === person.motherName,
          );
          const father = peoplesFromServer.find(
            p => p.name === person.fatherName,
          );

          return {
            ...person,
            mother,
            father,
          };
        });

        setPeople(newPeople);
      })
      .catch(() => setIsLoadingErr(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isLoadingErr && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoadingErr && !isLoading && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoadingErr && !isLoading && people.length !== 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
