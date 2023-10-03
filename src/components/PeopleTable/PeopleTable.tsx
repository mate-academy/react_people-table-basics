import React from 'react';
import { Person } from '../../types';
import { BodyTable } from '../BodyTable';

type Props = {
  people: Person[],
  selectedSlug: string | undefined,
};

const tableHead = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableHead.map(currentColumn => (
            <th key={`${currentColumn}_Date.now()`}>{currentColumn}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <BodyTable
            person={person}
            selectedSlug={selectedSlug}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
