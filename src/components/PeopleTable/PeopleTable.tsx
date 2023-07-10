import { FC } from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const newPeople = people.map((person: Person) => {
    const newPerson: Person = { ...person };

    const mother = people.find((el) => el.name === person.motherName);

    if (mother) {
      newPerson.mother = mother;
    }

    const father = people.find((el) => el.name === person.fatherName);

    if (father) {
      newPerson.father = father;
    }

    return newPerson;
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {newPeople.map((person: Person) => (
          <PersonLink person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
