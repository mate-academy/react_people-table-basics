import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';
import { ErrorMessages } from '../../types/errorMessages';

export const PeoplePage = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPersons)
      .catch(() => setErrorMessage(ErrorMessages.PeopleLoadError))
      .finally(() => setIsLoading(false));
  }, []);

  const personsWithParents: Person[] = persons.map(person => ({
    ...person,
    mother: persons.find(p => p.name === person.motherName),
    father: persons.find(p => p.name === person.fatherName),
  }));

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage && !isLoading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!persons.length && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!!persons.length && !isLoading && (
            <PeopleTable people={personsWithParents} />
          )}
        </div>
      </div>
    </>
  );
};
