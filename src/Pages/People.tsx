import { useEffect, useState } from 'react';

import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { ErrorMessage } from '../types/ErrorMessage';
import { PeopleTable } from '../components/PeopleTable';

const findParents = (people: Person[]): Person[] => {
  return people.map(person => {
    const father = people.find(({ name }) => person.fatherName === name);
    const mother = people.find(({ name }) => person.motherName === name);

    return ({
      ...person,
      father,
      mother,
    });
  });
};

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState(ErrorMessage.Default);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((peopleFromServ) => setPeople(findParents(peopleFromServ)))
      .catch(() => setErrorMessage(ErrorMessage.WentWrong))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading
            ? <Loader />
            : <PeopleTable people={people} />}

          {/* Peoplee table or error message should be rendered */}
          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

        </div>
      </div>
    </>
  );
};
