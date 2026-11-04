import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [isLoadding, setIsLoadding] = useState(false);
  const [isLoaddingError, setIsLoaddingError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const getParents = (persons: Person[]) => {
    return persons.map(person => {
      return {
        ...person,
        mother: persons.find(p => p.name === person.motherName),
        father: persons.find(p => p.name === person.fatherName),
      };
    });
  };

  useEffect(() => {
    setIsLoadding(true);
    setIsLoaddingError(false);

    getPeople()
      .then(data => setPeople(getParents(data)))
      .catch(() => setIsLoaddingError(true))
      .finally(() => setIsLoadding(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoadding ? (
            <Loader />
          ) : (
            <>
              {isLoaddingError ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : (
                <>
                  {people.length === 0 ? (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  ) : (
                    <PeopleTable people={people} />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
