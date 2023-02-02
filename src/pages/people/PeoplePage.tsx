import { useState, useEffect } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const loadPeople = async () => {
    try {
      setIsLoading(true);

      const loadedPeople = await getPeople();

      const peopleWithParents = loadedPeople.map(person => {
        const mother = loadedPeople
          .find(m => m.name === person.motherName);
        const father = loadedPeople
          .find(f => f.name === person.fatherName);

        return Object.assign(person, { father, mother });
      });

      setPeople(peopleWithParents);
    } catch (e) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const hasNoPeople = !isLoading && !people.length;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {hasNoPeople && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isLoading && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
