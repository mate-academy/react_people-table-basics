import React, { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { PersonList } from '../../components/PersonList';
import { Person } from '../../types';
import { getPeople } from '../../api';

const getPersonParents = (person: Person, people: Person[]): Person => {
  const { fatherName, motherName } = person;

  const personFather = people.find(
    parent => parent.name === fatherName,
  );

  const personMother = people.find(
    parent => parent.name === motherName,
  );

  return {
    ...person,
    father: personFather,
    mother: personMother,
  };
};

export const PeoplePage: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [hasErrorLoading, setHasErrorLoading] = useState(false);

  const getLoadedPersons = async () => {
    setIsLoadingList(true);
    try {
      const loadPersons = await getPeople();
      const parentsPeople: Person[] = loadPersons.map(
        person => getPersonParents(person, loadPersons),
      );

      setPersons(parentsPeople);
    } catch {
      setHasErrorLoading(true);
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    getLoadedPersons();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {hasErrorLoading && (
          <p data-cy="peopleLoadingError">
            Something went wrong
          </p>
        )}

        <div className="box table-container">
          {isLoadingList
            ? (
              <Loader />
            )
            : (
              <PersonList persons={persons} />
            )}

          {(!isLoadingList && !hasErrorLoading && persons.length === 0) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>

      </div>
    </>
  );
};
