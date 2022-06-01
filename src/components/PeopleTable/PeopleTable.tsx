import React from 'react';
import { Table } from 'react-bootstrap';
import { PersonRow } from '../PersonRow/PersonRow';

type Props = {
  people: People[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <Table striped bordered hover variant="dark">
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
        {people.map((person) => (
          <PersonRow
            person={person}
            key={person.slug}
          />
        ))}
      </tbody>
    </Table>
  );
};
