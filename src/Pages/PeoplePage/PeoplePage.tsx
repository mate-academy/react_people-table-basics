import { memo, useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';

export const PeoplePage = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadPeople = async () => {
    try {
      setIsLoading(true);

      const loadedPeople = await getPeople();

      const peopleWithParents = loadedPeople.map(person => {
        const father = loadedPeople.find(
          personFather => personFather.name === person.fatherName,
        );
        const mother = loadedPeople.find(
          personMother => personMother.name === person.motherName,
        );

        return Object.assign(person, { father, mother });
      });

      setPeople(peopleWithParents);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const NoPeopleExist = !isLoading && !people.length && hasError === false;

  return (
    <div className="container">

      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading
            && <Loader />}

          {hasError
            && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

          {NoPeopleExist
          && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length
         && <PeopleTable people={people} />}
        </div>
      </div>
    </div>
  );
});
