import { useEffect, useState } from 'react';
import { Loader } from './components/Loader';
import { Person } from './types';
import { getPeople } from './api';
import { PeopleTable } from './PeopleTable';

function findPerson(
  people: Person[], personName: string | null,
): Person | undefined {
  return people.find(person => person.name === personName);
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then((allPeople) => {
        return allPeople.map(person => (
          {
            ...person,
            mother: findPerson(allPeople, person.motherName),
            father: findPerson(allPeople, person.fatherName),
          }));
      })
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {loading ? (
          <Loader />
        ) : (
          <>
            {error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {people.length === 0 ? (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            ) : (
              <PeopleTable people={people} />
            )}
          </>
        )}
      </div>
    </div>
  );
};
