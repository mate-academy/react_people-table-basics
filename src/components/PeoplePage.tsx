import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { EnrichPerson, Person } from '../types';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

const enrichPeople = (people: Person[]): EnrichPerson[] => {
  return people.map(person => {
    const mother = people.find(pers => pers.name === person.motherName) || null;
    const father = people.find(pers => pers.name === person.fatherName) || null;

    return { ...person, mother, father };
  });
};

export const PeoplePage = () => {
  const [people, setpeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        const enrichedPeople = enrichPeople(data);

        setpeople(enrichedPeople);
      })
      .catch(err => {
        setHasError(true);
        throw err;
      })
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

          {!people.length && !hasError && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
