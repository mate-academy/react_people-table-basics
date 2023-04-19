import { useEffect, useState } from 'react';
import { PeopleTable } from '../components/PeolpeTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsInitialized(false);
      setError(false);

      try {
        const peopleFromServer = await getPeople();

        const peopleWithParents = peopleFromServer.map((person) => {
          const mother = peopleFromServer
            .find(mom => mom.name === person.motherName);
          const father = peopleFromServer
            .find(fath => fath.name === person.fatherName);

          return (
            {
              ...person,
              mother,
              father,
            }
          );
        });

        setPeople(peopleWithParents);
        setIsInitialized(true);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const noPeopleOnServer = isInitialized && !people.length;

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && (
        <Loader />
      )}

      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {noPeopleOnServer && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}

      {people.length > 0 && (
        <PeopleTable people={people} />
      )}
    </>
  );
};
