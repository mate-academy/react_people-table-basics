import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type PeopleTableProps = {
  people: Person[];
  selectedPersonSlug: string | null;
};

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  selectedPersonSlug,
}) => (
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
            selectedPersonSlug === person.slug ? 'has-background-warning' : ''
          }
        >
          <td>
            <PersonLink person={person.name} allPeople={people} />
          </td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>
            <PersonLink person={person.motherName} allPeople={people} />
          </td>
          <td>
            <PersonLink person={person.fatherName} allPeople={people} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
