import React, { useState, useEffect } from 'react';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { Loader } from '../components/Loader/Loader/Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);

  const findParent = (allPeople: Person[], name: string) => {
    return allPeople.find(person => person.name === name);
  };

  useEffect(() => {
    const getPeopleTableFromServer = async () => {
      try {
        setIsLoading(true);
        const peopleFromServer = await getPeople();

        const visiblePeople = peopleFromServer.map(person => {
          const currentPerson = { ...person };
          const { fatherName, motherName } = currentPerson;

          if (fatherName) {
            currentPerson.father = findParent(peopleFromServer, fatherName);
          }

          if (motherName) {
            currentPerson.mother = findParent(peopleFromServer, motherName);
          }

          return currentPerson;
        });

        setPeople(visiblePeople);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getPeopleTableFromServer();
  }, []);

  return (
    <div>
      <div className="block">
        <div className="box table-container">

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isLoading ? (
            <Loader />
          ) : (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </div>

  );
};
