import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';

export enum ErrorType {
  NONE = '',
  LOAD = 'Something went wrong',
  NOPEOPLE = 'There are no people on the server',
}

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<ErrorType>(ErrorType.NONE);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setIsLoading(true);

        const fetchedPeople = await getPeople();
        const peopleWithParents = fetchedPeople.map(person => {
          const copyPerson = { ...person };

          if (person.motherName) {
            copyPerson.mother
              = fetchedPeople.find(mother => mother.name === person.motherName);
          }

          if (person.fatherName) {
            copyPerson.father
              = fetchedPeople.find(father => father.name === person.fatherName);
          }

          return copyPerson;
        });

        if (peopleWithParents.length === 0) {
          setErrorMessage(ErrorType.NOPEOPLE);

          return;
        }

        setPeople(peopleWithParents);
        setErrorMessage(ErrorType.NONE);
      } catch {
        setErrorMessage(ErrorType.LOAD);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const isLoadError = errorMessage === ErrorType.LOAD;
  const areNotPeopleError = errorMessage === ErrorType.NOPEOPLE;

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoadError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {areNotPeopleError && (
            <p data-cy="noPeopleMessage">
              {errorMessage}
            </p>
          )}

          {isLoading ? (
            <Loader />
          ) : (
            !errorMessage && <PeopleTable people={people} />
          )}
        </div>
      </div>
    </div>
  );
};
