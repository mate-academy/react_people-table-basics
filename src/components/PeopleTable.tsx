import React from 'react';
import { Person } from '../types';
import cn from 'classnames';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => (
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
        const isSelected = person.slug === selectedSlug;

        const motherName = person.motherName?.trim() || null;
        const fatherName = person.fatherName?.trim() || null;

        const motherKey = motherName?.toLowerCase() || null;
        const fatherKey = fatherName?.toLowerCase() || null;

        const mother = motherKey
          ? people.find(p => p.name.toLowerCase().trim() === motherKey)
          : null;

        const father = fatherKey
          ? people.find(p => p.name.toLowerCase().trim() === fatherKey)
          : null;

        return (
          <tr
            key={person.slug}
            data-cy="person"
            className={cn({ 'has-background-warning': isSelected })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {mother ? (
                <PersonLink person={mother} />
              ) : motherName ? (
                <span className="has-text-danger">{motherName}</span>
              ) : (
                '-'
              )}
            </td>
            <td>
              {father ? (
                <PersonLink person={father} />
              ) : fatherName ? (
                fatherName
              ) : (
                '-'
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
