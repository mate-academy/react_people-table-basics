import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInizialized, setIsInizialized] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadPeople = async () => {
    setIsLoading(true);
    setIsInizialized(false);
    setIsError(false);

    try {
      const getPeopleFromServer = await getPeople();
      const peopleWithParent = getPeopleFromServer.map(person => {
        const mother = getPeopleFromServer.find(
          mom => mom.name === person.motherName,
        );
        const father = getPeopleFromServer.find(
          dad => dad.name === person.fatherName,
        );

        return (
          {
            ...person,
            mother,
            father,
          }
        );
      });

      setPeople(peopleWithParent);
      setIsInizialized(true);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const isNoPeopleOnServer = !people.length && isInizialized;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (<Loader />)}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isNoPeopleOnServer && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && (
            <>
              <PeopleTable people={people} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
