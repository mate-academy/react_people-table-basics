import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
  allPeople: Person[];
  selectedSlug: string | null;
  onSelectPerson: (slug: string) => void;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  allPeople,
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
          const mother = person.motherName
            ? allPeople.find(p => p.name === person.motherName) || null
            : null;

          const father = person.fatherName
            ? allPeople.find(p => p.name === person.fatherName) || null
            : null;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={
                person.slug === selectedSlug ? 'has-background-warning' : ''
              }
              onClick={() => onSelectPerson(person.slug)}
              style={{ cursor: 'pointer' }}
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
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
