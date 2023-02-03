import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/Loader/PeopleTable';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [showError, setShowError] = useState('');

  const errorMessage = (message: string) => {
    setShowError(message);
  };

  const getPeopleFromServer = async () => {
    try {
      const dataFromServer = await getPeople();

      const peopleWithParents = dataFromServer.map((person: Person) => {
        return {
          ...person,
          mother: dataFromServer.find(
            (p: Person) => p.name === person.motherName,
          ),
          father: dataFromServer.find(
            (p: Person) => p.name === person.fatherName,
          ),
        };
      });

      setPeople(peopleWithParents);
    } catch {
      errorMessage('Something went wrong');
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {people.length === 0 && (
            <>
              <Loader />
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {showError}
              </p>
            </>
          )}

          {!people && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          <PeopleTable
            people={people}
          />
        </div>
      </div>
    </>
  );
};
