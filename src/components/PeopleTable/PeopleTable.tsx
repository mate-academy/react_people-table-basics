import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface PeopleTableProps {
  people: Person[];
  selectedSlug?: string;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  selectedSlug,
}) => {
  const findPersonByName = (name?: string) => people.find(p => p.name === name);

  return (
    <div className="box table-container">
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
            const isSelected = selectedSlug === person.slug;
            const mother = findPersonByName(person.motherName || undefined);
            const father = findPersonByName(person.fatherName || undefined);

            return (
              <tr
                key={person.slug}
                data-cy="person"
                className={isSelected ? 'has-background-warning' : ''}
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
    </div>
  );
};
