import React from 'react';
import { Person } from '../types/Person'; // 1. ИСПРАВЛЯЕМ: Импортируем тип
import { PersonLink } from './PersonLink'; // Использование одинарных кавычек ''

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
      {people.map(person => (
        <tr
          key={person.slug}
          data-cy="person"
          className={
            selectedSlug === person.slug ? 'has-background-warning' : ''
          }
        >
          <td>
            <PersonLink personName={person.name} people={people} />
          </td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>
            {person.motherName ? (
              <PersonLink personName={person.motherName} people={people} />
            ) : (
              '-'
            )}
          </td>
          <td>
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
