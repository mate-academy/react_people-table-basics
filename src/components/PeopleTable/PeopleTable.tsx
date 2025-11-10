import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  people: Person[];
  selectedSlug: string | undefined;
}

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const getPersonByName = (name: string): Person | undefined => {
    return people.find(p => p.name === name);
  };

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
            const mother = person.motherName
              ? getPersonByName(person.motherName)
              : undefined;
            const father = person.fatherName
              ? getPersonByName(person.fatherName)
              : undefined;

            return (
              <tr
                key={person.slug}
                data-cy="person"
                className={
                  person.slug === selectedSlug ? 'has-background-warning' : ''
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
                  ) : person.motherName ? (
                    <span data-cy="motherName">{person.motherName}</span>
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {father ? (
                    <PersonLink person={father} />
                  ) : person.fatherName ? (
                    <span data-cy="motherName">{person.fatherName}</span>
                  ) : (
                    '-'
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
