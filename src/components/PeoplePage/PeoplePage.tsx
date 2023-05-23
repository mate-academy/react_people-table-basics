import { useCallback, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';

const findPersonByName = (
  peopleToFindFrom: Person[],
  nameToFind: string | null,
) => {
  if (nameToFind) {
    return peopleToFindFrom.find(({ name }) => name === nameToFind);
  }

  return undefined;
};

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const isListEmpty = !people.length && !isLoading && !isError;

  const loadPeople = useCallback(async () => {
    setIsLoading(true);
    try {
      const peopleFromServer = await getPeople();

      const preparedPeople = peopleFromServer.map(person => {
        const personCopy = { ...person };

        personCopy.mother = findPersonByName(
          peopleFromServer,
          person.motherName,
        );
        personCopy.father = findPersonByName(
          peopleFromServer,
          person.fatherName,
        );

        return personCopy;
      });

      setPeople(preparedPeople);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {(!isLoading && !isListEmpty) && <PeopleTable people={people} />}

          {isError && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}

          {isListEmpty && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
