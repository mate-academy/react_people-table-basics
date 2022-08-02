import React from 'react';
import { Person } from '../types/Person';
import './PeopleTable.scss';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="table PeopleTable">
      <tr>
        <th>Name</th>
        <th>Sex</th>
        <th>Born</th>
        <th>Died</th>
        <th>Mother</th>
        <th>Father</th>
      </tr>

      {people.map(person => (
        <tr className="Person">
          <td>{person.name}</td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>{person.motherName}</td>
          <td>{person.fatherName}</td>
        </tr>
      ))}
    </table>
  );
};
