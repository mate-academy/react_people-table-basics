import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const loadPeople = () => {
    getPeople()
      .then((fetchedPeople) => {
        const peopleWithParents = fetchedPeople.map((person) => {
          const father = fetchedPeople.find(
            (personFather) => personFather.name === person.fatherName,
          );

          const mother = fetchedPeople.find(
            (personMother) => personMother.name === person.motherName,
          );

          return {
            ...person,
            father,
            mother,
          };
        });

        setPeople(peopleWithParents);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length === 0 && !isLoading && !isError && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length > 0 && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
