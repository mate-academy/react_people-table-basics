import React, { useState, useEffect } from "react";
import { getPeople } from "../../api/people";
import { v4 as uuidv4 } from 'uuid';
import { PeopleTable } from "../PeopleTable/PeopleTable";

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<PersonWithParents[]>([]);

  useEffect(() => {
    getPeople()
      .then(requestPeople => {

        const newPeople: Array<PersonWithParents> = requestPeople.map((person: Person) => {
          const father: Person = requestPeople.find(({ name }: Person) => name === person.fatherName);
          const mother: Person = requestPeople.find(({ name }: Person) => name === person.motherName);

          return {
            ...person,
            father,
            mother,
            id: uuidv4(),
          }
        });

        setPeople(newPeople);
      });
  }, []);

  return (
    <div className="container">
      <h2>People table</h2>

      <PeopleTable people={people} />
    </div>
  );
};
