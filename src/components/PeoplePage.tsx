import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api/api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const peopleWithParents = people.map(person => ({
    ...person,
    father: people.find(father => person.fatherName === father.name),
    mother: people.find(mother => person.motherName === mother.name),
  }));

  useEffect(() => {
    async function loadPeople() {
      setIsLoading(true);
      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && !isLoading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !isError && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !isError && people.length !== 0 && (
            <PeopleTable people={peopleWithParents} />
          )}
        </div>
      </div>
    </>
  );
};
