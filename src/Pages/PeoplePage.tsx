import {
  FC, memo, useEffect, useState,
} from 'react';
import { FullPerson, Person } from '../types/person';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage: FC = memo(() => {
  const [people, setPeople] = useState<FullPerson[]>([]);

  useEffect(() => {
    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(response => response.json())
      .then(data => {
        const preparedPeople = data.map((child: Person) => {
          const father = data.find((person: Person) => (
            person.name === child.fatherName
          )) || null;

          const mother = data.find((person: Person) => (
            person.name === child.motherName
          )) || null;

          return {
            ...child,
            father,
            mother,
          };
        });

        setPeople(preparedPeople);
      });
  }, []);

  return (
    <>
      <h1 className="title">People page</h1>

      <PeopleTable
        people={people}
      />
    </>
  );
});
