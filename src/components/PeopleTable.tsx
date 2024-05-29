import React from 'react';
import { Person } from '../types';
import { PersonInfo } from './PersonInfo';

type Props = {
  people: Person[];
};

const LIST_CELLS = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {LIST_CELLS.map(cell => (
            <th key={cell}>{cell}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const { slug } = person;

          return <PersonInfo person={person} key={slug} />;
        })}
      </tbody>
    </table>
  );
};
