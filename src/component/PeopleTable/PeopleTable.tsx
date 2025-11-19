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
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {people.find(p => p.name === person.motherName) ? (
                <PersonLink
                  person={people.find(p => p.name === person.motherName)!}
                />
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {people.find(p => p.name === person.fatherName) ? (
                <PersonLink
                  person={people.find(p => p.name === person.fatherName)!}
                />
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
