import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/Loader/PeopleTable';

const findParents = (people: Person[]) => {
  return people.map(person => {
    const personFather = people.find(
      parent => parent.name === person.fatherName,
    );

    const personMother = people.find(
      parent => parent.name === person.motherName,
    );

    return { ...person, mother: personMother, father: personFather };
  });
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(res => setPeople(findParents(res)))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

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

          {!isLoading &&
            !hasError &&
            (people.length > 0 ? (
              <PeopleTable people={people} />
            ) : (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            ))}
        </div>
      </div>
    </>
  );
};
