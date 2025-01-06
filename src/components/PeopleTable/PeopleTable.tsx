import React from 'react';
import { PersonComponent } from '../PersonComponent/PersonComponent';
import { Person } from '../../types';

type Props = {
  people: Person[];
};

const columnNames = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable: React.FC<Props> = (props: Props) => {
  const { people } = props;

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columnNames.map(name => (
            <th key={name}>{name}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          return (
            <PersonComponent
              person={person}
              key={person.slug}
              people={people}
            />
          );
        })}
      </tbody>
    </table>
  );
};
