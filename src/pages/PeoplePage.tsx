import { useState, useEffect } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadPeople = async () => {
    setIsLoading(true);
    setIsInitialized(false);
    setIsError(false);
    try {
      const serverResp = await getPeople();
      const onlyWithParents = serverResp.map((person) => {
        const mother = serverResp.find(m => m.name === person.motherName);
        const father = serverResp.find(f => f.name === person.fatherName);

        return (
          {
            ...person,
            mother,
            father,
          }
        );
      });

      setPeople(onlyWithParents);
      setIsInitialized(true);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const isNoPeopleOnServer = isInitialized && !people.length;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length > 0 && (
            <PeopleTable people={people} />
          )}

          {isNoPeopleOnServer && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
