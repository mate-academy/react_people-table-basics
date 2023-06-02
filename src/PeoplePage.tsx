import { useState, useEffect } from 'react';
import { Person } from './types';
import { getPeople } from './api';
import { PeopleTable } from './PeopleTable';
import { Loader } from './components/Loader';

type Props = {
  activePerson: Person | null,
  setActivePerson(person: Person): void,
};

export const PeoplePage: React.FC<Props> = ({
  activePerson,
  setActivePerson,
}) => {
  const [people, setPeople] = useState<Person[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const getPersons = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await getPeople();

      setPeople(response);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPeople([]);
    getPersons();
  }, []);

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

          {(!isLoading && !isError) && (
            <PeopleTable
              activePerson={activePerson}
              setActivePerson={setActivePerson}
              people={people}
            />
          )}
        </div>
      </div>
    </>
  );
};
