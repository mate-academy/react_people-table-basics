import { FC } from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = ({ people }) => {
  if (!people.length) {
    return null;
  }

  const newPeople = people.map((person: Person) => {
    const newPerson: Person = { ...person };

    newPerson.mother = people.find((el) => el.name === person.motherName);
    newPerson.father = people.find((el) => el.name === person.fatherName);

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
