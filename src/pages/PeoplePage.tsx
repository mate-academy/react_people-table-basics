import React, { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const hasError = !isLoading && error;
  const noPeople = !isLoading && people.length === 0;
  const showTable = !isLoading && people.length > 0;

  const peopleWithParents = people.reduce((newPeople: Person[], person) => {
    const mother = people.find(mama => mama.name === person.motherName);
    const father = people.find(papa => papa.name === person.fatherName);

    const updatedPerson = {
      ...person,
      mother,
      father,
    };

    newPeople.push(updatedPerson);

    return newPeople;
  }, []);

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      setError(false);

      try {
        const fetchedPeople = await getPeople();

        setPeople(fetchedPeople);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {noPeople && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {showTable && <PeopleTable people={peopleWithParents} />}
        </div>
      </div>
    </>
  );
};
