import React from 'react';
import { PersonLink } from './PersonLink';

export interface Person {
  slug: string;
  name: string;
  sex: string;
  born: number;
  died: number;
  motherName: string | null;
  fatherName: string | null;
}

interface PeopleTableProps {
  people: Person[];
  selectedSlug?: string;
  onSelectPerson: (slug: string) => void;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  selectedSlug,
  onSelectPerson,
}) => {
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
        {people.map(person => {

          const motherName = person.motherName;
          let motherElement;
          if (!motherName) {
            motherElement = '-';
          } else {
            const mother = people.find(p => p.name === motherName);
            motherElement = mother ? (
              <PersonLink person={mother} onSelect={onSelectPerson} />
            ) : (
              motherName
            );
          }

          const fatherName = person.fatherName;
          let fatherElement;
          if (!fatherName) {
            fatherElement = '-';
          } else {
            const father = people.find(p => p.name === fatherName);
            fatherElement = father ? (
              <PersonLink person={father} onSelect={onSelectPerson} />
            ) : (
              fatherName
            );
          }

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={person.slug === selectedSlug ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} onSelect={onSelectPerson} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{motherElement}</td>
              <td>{fatherElement}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
