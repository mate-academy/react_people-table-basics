import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';

export const PeoplePage = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadPeople = async () => {
    try {
      setIsLoading(true);
      const personsFromServer = await getPeople();

      const findParent = (parentName: string | null) => (
        personsFromServer.find(parent => parent.name === parentName)
      );

      setPersons(personsFromServer.map(person => ({
        ...person,
        mother: findParent(person.motherName),
        father: findParent(person.fatherName),
      })));
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
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

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {persons.length > 0 && !isLoading && <PeopleTable people={persons} />}

          {persons.length === 0 && !isLoading && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
