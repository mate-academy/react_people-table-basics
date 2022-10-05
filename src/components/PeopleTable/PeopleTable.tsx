import React from 'react';
import { PersonItem } from '../Person';
import { Person } from '../../types';

type Props = {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const tableTitles = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableTitles.map(title => <th key={title}>{title}</th>)}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonItem key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
