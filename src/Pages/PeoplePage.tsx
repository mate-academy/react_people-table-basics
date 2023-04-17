import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';

const findParent = (people: Person[], name: string) => {
  return people.find(person => person.name === name);
};

export const PeoplePage: React.FC = () => {
  const [peopleTable, setPeopleTable] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getPeopleTableFromServer = async () => {
      try {
        const tableFromServer = await getPeople();

        const visiblePeople = tableFromServer.map(person => {
          const currentPerson = { ...person };
          const { fatherName, motherName } = currentPerson;

          if (fatherName) {
            currentPerson.father = findParent(tableFromServer, fatherName);
          }

          if (motherName) {
            currentPerson.mother = findParent(tableFromServer, motherName);
          }

          return currentPerson;
        });

        setPeopleTable(visiblePeople);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getPeopleTableFromServer();
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(!peopleTable.length && !isLoading) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isLoading
            ? <Loader />
            : <PeopleTable people={peopleTable} />
          }

        </div>
      </div>
    </div>
  );
};
