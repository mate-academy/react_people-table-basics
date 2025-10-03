import React, { useMemo } from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const byName = useMemo(() => {
    const m = new Map<string, Person>();
    for (const p of people) m.set(p.name, p);
    return m;
  }, [people]);

  if (people.length === 0) {
    return null;
  }

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
          const mother = person.motherName ? byName.get(person.motherName) : undefined;
          const father = person.fatherName ? byName.get(person.fatherName) : undefined;
          const isSelected = selectedSlug === person.slug;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : undefined}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName
                  ? (mother ? <PersonLink person={mother} /> : person.motherName)
                  : '-'}
              </td>
              <td>
                {person.fatherName
                  ? (father ? <PersonLink person={father} /> : person.fatherName)
                  : '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
