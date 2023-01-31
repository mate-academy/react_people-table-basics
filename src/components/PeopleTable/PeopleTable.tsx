import React, { useContext } from 'react';
import { PersonItem } from '../Person';
import { PeopleContext } from '../../context';
import { Person } from '../../types';

export const PeopleTable: React.FC = () => {
  const tableTitles = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];
  const people = useContext(PeopleContext);

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
        {people.map((person: Person) => (
          <PersonItem
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
