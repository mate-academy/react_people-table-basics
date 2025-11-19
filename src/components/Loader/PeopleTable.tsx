import React from 'react';
import { PersonLink } from './PersonLink';
import { Person } from '../../types';

interface Prop {
  people: Person[];
  selectedSlug?: string;
  onSelect?: (slug: string) => void;
}

export const PeopleTable: React.FC<Prop> = ({
  people,
  selectedSlug,
  onSelect,
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
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={
              selectedSlug === person.slug
                ? 'has-background-warning'
                : undefined
            }
            onClick={() => onSelect?.(person.slug)}
          >
            <td onClick={e => e.stopPropagation()}>
              <PersonLink personName={person.name} people={people} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td onClick={e => e.stopPropagation()}>
              {person.motherName ? (
                <PersonLink personName={person.motherName} people={people} />
              ) : (
                '-'
              )}
            </td>
            <td onClick={e => e.stopPropagation()}>
              {person.fatherName ? (
                <PersonLink personName={person.fatherName} people={people} />
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
