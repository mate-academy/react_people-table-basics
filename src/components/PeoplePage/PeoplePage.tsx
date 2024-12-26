import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasLoadingError(false);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setHasLoadingError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const preparedPeople = people.map(person => {
    const mother = people.find(someone => someone.name === person.motherName);
    const father = people.find(someone => someone.name === person.fatherName);

    return { ...person, mother, father };
  });

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {hasLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!!people.length && <PeopleTable people={preparedPeople} />}

          {!people.length && !isLoading && !hasLoadingError && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </>
  );
};
