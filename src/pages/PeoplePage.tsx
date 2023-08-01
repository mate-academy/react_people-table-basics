import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Loader } from '../components/Loader';
import { PeopleList } from '../components/PeopleList';
import { getPeople } from '../api';
import { Person } from '../types/Person';

const getParent = (personList: Person[], parentName: string | null) => {
  return personList.find(({ name }) => name === parentName);
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setisError] = useState(false);

  const loadPeople = useCallback(async () => {
    setIsLoading(true);
    try {
      const loadedPeople = await getPeople();

      setisError(false);
      setPeople(loadedPeople);
    } catch {
      setisError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPeople();
  }, []);

  const peopleWithParents = useMemo(() => {
    return people.map((person) => ({
      ...person,
      mother: getParent(people, person.motherName),
      father: getParent(people, person.fatherName),
    }));
  }, [people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && !isLoading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && people.length === 0 && !isError && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && !isLoading && (
            <PeopleList people={peopleWithParents} />
          )}
        </div>
      </div>
    </>
  );
};
