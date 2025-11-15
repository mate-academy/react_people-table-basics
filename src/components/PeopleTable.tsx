import React, { useMemo } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const peopleMap = useMemo(() => {
    const map = new Map<string, Person>();

    for (const person of people) {
      map.set(person.name, person);
    }

    return map;
  }, [people]);

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
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink name={person.name} peopleMap={peopleMap} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink name={person.motherName} peopleMap={peopleMap} />
            </td>
            <td>
              <PersonLink name={person.fatherName} peopleMap={peopleMap} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
