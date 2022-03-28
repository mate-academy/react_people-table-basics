import React from 'react';
import { PersonRow } from '../PersonRow/PersonRow';
import './PeopleTable.scss';

type Props = {
  people: Person[] | null,
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="people-table">
      <thead>
        <tr style={{ backgroundColor: '#fff' }}>
          <td>Name</td>
          <td>Sex</td>
          <td>Born</td>
          <td>Died</td>
          <td>Mother</td>
          <td>Father</td>
        </tr>
      </thead>
      <tbody>
        {people?.map(person => (
          <PersonRow person={person} key={Math.random()} />
        ))}
      </tbody>
    </table>
  );
};
