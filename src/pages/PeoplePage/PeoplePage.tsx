import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/api';
import { PeopleTable } from '../../components/PeopleTable';
import { Person, PersonFromServer } from '../../types/Person';

export const PeoplePage:React.FC = React.memo(() => {
  const [people, setPeople] = useState<Person[]>([]);

  const preparePeople = (peopleFor: PersonFromServer[]): Person[] => {
    return peopleFor.map(person => {
      return {
        ...person,
        father: peopleFor.find(father => father.name === person.fatherName),
        mother: peopleFor.find(mother => mother.name === person.motherName),
      };
    });
  };

  useEffect(() => {
    getPeople()
      .then(response => setPeople(preparePeople(response)));
  }, []);

  return (
    <div className="Page">
      <h1>
        People Page
      </h1>
      <PeopleTable people={people} />
    </div>
  );
});
