import React, {
  useCallback, useEffect, useState,
} from 'react';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';
import { Loader } from '../Loader';

const toFindParents = (people: Person[], personName: string | null) => {
  const personParent = people.find(({ name }) => name === personName);

  return personParent;
};

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [areNoPeople, setAreNoPeople] = useState(false);

  const loadPeople = useCallback(async () => {
    try {
      setIsLoading(true);
      const peopleFromServer = await getPeople();

      const peopleWithPearents = peopleFromServer.map(person => {
        return (
          {
            ...person,
            mother: toFindParents(peopleFromServer, person.motherName),
            father: toFindParents(peopleFromServer, person.fatherName),
          }
        );
      });

      if (peopleWithPearents.length === 0) {
        setAreNoPeople(true);
      }

      setPeople(peopleWithPearents);
    } catch {
      setError('Something went wrong');
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {error}
        </p>
      )}

      {areNoPeople && (
        <p data-cy="noPeopleMessage" className="has-text-danger">
          There are no people on server
        </p>
      )}

      {!error && !areNoPeople && (
        isLoading
          ? <Loader />
          : (
            <PeopleTable
              people={people}
            />
          )
      )}
    </>
  );
};
