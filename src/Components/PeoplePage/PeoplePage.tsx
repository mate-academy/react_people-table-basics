import { useEffect, useState } from 'react';
import { getPeople } from '../../api/api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

function addParents(people: Person[]) {
  const newPeople = people.map(person => {
    if (person.motherName && person.fatherName) {
      return {
        ...person,
        mother: people.find(human => human.name === person.motherName)
          || null,
        father: people.find(human => human.name === person.fatherName)
          || null,
      };
    }

    if (person.motherName && !person.fatherName) {
      return {
        ...person,
        mother: people.find(human => human.name === person.motherName)
          || null,
      };
    }

    return {
      ...person,
      father: people.find(human => human.name === person.fatherName)
          || null,
    };
  });

  return newPeople;
}

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(data => setPeople(addParents(data)));
  }, []);

  return (
    <>
      <h1>People page</h1>
      <PeopleTable
        people={people}
      />
    </>
  );
};
