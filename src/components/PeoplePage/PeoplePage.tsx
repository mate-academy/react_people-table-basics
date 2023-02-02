import React, {
  memo,
  useEffect,
  useState,
} from 'react';

import { Loader } from '../Loader';

import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const loadedPeople = async () => {
    try {
      setIsLoading(true);

      const loadPeople = await getPeople();

      const peopleWithParents = loadPeople.map(person => {
        const father = loadPeople.find(f => f.name === person.fatherName);
        const mother = loadPeople.find(m => m.name === person.motherName);

        return (
          {
            ...person,
            father,
            mother,
          }
        );
      });

      setPeople(peopleWithParents);
    } catch {
      setErrorMessage(true);
    } finally {
      setIsLoading(false);
    }
  };

  const hasNoPeople = !isLoading && !people.length;

  useEffect(() => {
    loadedPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage && (
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
});
