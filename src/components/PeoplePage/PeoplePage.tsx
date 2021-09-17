import React, { useState, useEffect } from "react";
import { getPeople } from "../../api";
import { PeopleTable } from "../PeopleTable";
import { uuid } from 'uuidv4';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasLoadingError, setLoadingError] = useState(false);

  useEffect(() => {
    const loadPeople = async () => {
      try {
        const peopleFromServer = await getPeople();

        const peopleWithParents = peopleFromServer.map(person => ({
          ...person,
          father: peopleFromServer.find(man => man.name === person.fatherName) || null,
          mother: peopleFromServer.find(woman => woman.name === person.motherName) || null,
          id: uuid(),
        }));

        setPeople(peopleWithParents);
        setLoadingError(false);
      } catch {
        setLoadingError(true);
      }
    }

    loadPeople();
  }, []);

  return (
    <>
      <h1>People page</h1>
      {hasLoadingError && <h2>Something went wrong...</h2>}
      {people.length > 0 && (
        <PeopleTable people={people} />
      )}
    </>
  )
}
