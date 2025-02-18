import React from 'react';
import { Person } from '../../types';
import { PersonItem } from './PersonItem';

type Props = {
  people: Person[];
};

const prepareVisiblePeople = (people: Person[]) => {
  return people.map(person => ({
    ...person,
    mother: people.find(p => p.name === person.motherName),
    father: people.find(p => p.name === person.fatherName),
  }));
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const visiblePeople = prepareVisiblePeople(people);
  const columns = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => (
          <PersonItem person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
