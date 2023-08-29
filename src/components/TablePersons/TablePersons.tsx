import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types/Person';
import { TableItem } from '../TableItem';

type Props = {
  persons: Person[];
};

export const TablePersons: React.FC<Props> = ({ persons }) => {
  const { personURL } = useParams();

  return (
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
        {persons.map(person => (
          <TableItem
            key={`${person.name}-${person.born}`}
            person={person}
            selectedUser={personURL}
          />
        ))}
      </tbody>
    </table>
  );
};
