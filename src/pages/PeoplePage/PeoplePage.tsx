import { useEffect, useState } from 'react';

import { getPeople } from '../../api';
import { Person } from '../../types';

import { PeopleTable } from '../../components/PeopleTable';
import { Loader } from '../../components/Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  function addParents(person: Person, peopleList: Person[]) {
    const mother = peopleList.find(p => p.name === person.motherName) || null;
    const father = peopleList.find(p => p.name === person.fatherName) || null;

    return {
      ...(mother ? { mother } : {}),
      ...(father ? { father } : {}),
    };
  }

  useEffect(() => {
    setIsLoading(true);
    setLoadingError(false);

    getPeople()
      .then(response => {
        const normalizedPeople = response.map((person: Person) => {
          return { ...person, ...addParents(person, response) };
        });

        setPeople(normalizedPeople);
        setIsLoading(false);
      })
      .catch(() => {
        setLoadingError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {loadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length === 0 && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length > 0 && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
