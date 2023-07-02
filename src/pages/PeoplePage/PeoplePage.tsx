import { useEffect, useState } from 'react';

import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(response => setPeople(response))
      .catch(() => setIsError(true))
      .finally(() => setIsLoaded(true));
  }, []);

  const preparedPeople: Person[] = people.map(person => {
    const mother = people.find(
      possibleMother => possibleMother.name === person.motherName,
    );
    const father = people.find(
      possibleFather => possibleFather.name === person.fatherName,
    );

    return {
      ...person,
      mother,
      father,
    };
  });

  const isErrorVisible = isLoaded && isError;
  const isNoPeopleVisible = isLoaded && !isError && people.length === 0;
  const isPeopleTabVisible = isLoaded && !isError && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {!isLoaded && <Loader />}

          {isErrorVisible && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isNoPeopleVisible && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isPeopleTabVisible && <PeopleTable people={preparedPeople} />}
        </div>
      </div>

    </>
  );
};
