import React from 'react';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
  selectedSlug?: string;
}

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
        const mother = people.find(p => p.name === person.motherName);
        const father = people.find(p => p.name === person.fatherName);

        return (
          <tr
            key={person.slug}
            data-cy="person"
            className={
              selectedSlug === person.slug ? 'has-background-warning' : ''
            }
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
