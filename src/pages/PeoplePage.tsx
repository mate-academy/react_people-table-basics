import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(peopleFromServer => {
        const processedPeople = peopleFromServer.map(p => ({
          ...p,
          name: p.name.trim(),
          motherName: p.motherName ? p.motherName.trim() : null,
          fatherName: p.fatherName ? p.fatherName.trim() : null,
          slug: p.slug || p.name.toLowerCase().replace(/\s/g, '-'),
        }));

        const peopleWithResolvedParents = processedPeople.map(person => {
          const mother = person.motherName
            ? processedPeople.find(p => p.name === person.motherName)
            : undefined;

          const father = person.fatherName
            ? processedPeople.find(p => p.name === person.fatherName)
            : undefined;

          return {
            ...person,
            mother,
            father,
          };
        });

        setPeople(peopleWithResolvedParents);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isEmptyPeople = !isLoading && !hasError && people.length === 0;
  const shouldShowTable = !isLoading && !hasError && people.length > 0;

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

          {isEmptyPeople && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {shouldShowTable && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
