import React, { useState, useEffect } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const loadData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const peopleFromServer = await getPeople();
      const updatedPeople = peopleFromServer.map((person) => {
        const mother = peopleFromServer
          .find(mom => mom.name === person.motherName);
        const father = peopleFromServer
          .find(dad => dad.name === person.fatherName);

        return (
          {
            ...person,
            mother,
            father,
          }
        );
      });

      setPeople(updatedPeople);
    } catch {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const isPeopleArrayEmpty = !isLoading && !people.length;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {!!error.length && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {!!people.length && (
            <PeopleTable people={people} />
          )}

          {isPeopleArrayEmpty && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
