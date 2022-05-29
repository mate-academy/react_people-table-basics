import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../type/person';
import { PeopleTable } from '../PeopleTabel/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then((peopleFS: Person[]) => {
      setPeople(peopleFS);
    });
  }, []);

  const preparedPeople = people.map(person => {
    const personMother = people
      .find(mother => person.motherName === mother.name);
    const personFather = people
      .find(father => person.fatherName === father.name);

    return {
      ...person,
      mother: personMother,
      father: personFather,
    };
  });

  return (
    <div>
      <h1 className="title">People Page</h1>
      {people && (
        <PeopleTable people={preparedPeople} />
      )}
    </div>
  );
};
