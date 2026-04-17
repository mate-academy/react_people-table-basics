import React from 'react';
import { Person } from './types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const getPersonByName = (name: string | null) =>
    people.find(p => p.name === name);

  return (
    <table className="table is-striped is-fullwidth">
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
              {person.motherName ? (
                getPersonByName(person.motherName) ? (
                  <PersonLink person={getPersonByName(person.motherName)!} />
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                getPersonByName(person.fatherName) ? (
                  <PersonLink person={getPersonByName(person.fatherName)!} />
                ) : (
                  person.fatherName
                )
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
