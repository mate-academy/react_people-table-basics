import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleWithParents = people.map(currentPerson => {
    const mother =
      currentPerson.motherName &&
      people.find(
        person =>
          person.name === currentPerson.motherName &&
          person.born < currentPerson.born,
      );

    const father =
      currentPerson.fatherName &&
      people.find(
        person =>
          person.name === currentPerson.fatherName &&
          person.born < currentPerson.born,
      );

    return {
      ...currentPerson,
      ...(mother ? { mother } : {}),
      ...(father ? { father } : {}),
    };
  });

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {!isLoading && !error && peopleWithParents.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !error && peopleWithParents.length > 0 && (
            <PeopleTable people={peopleWithParents} />
          )}
        </div>
      </div>
    </>
  );
};
