import React from 'react';
import PersonRow from '../PersonRow';
import './PeopleTable.scss';

interface Props {
  people: PreparedHuman[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <td className="row">
            <strong>Name</strong>
          </td>

          <td className="row">
            <strong>Sex</strong>
          </td>

          <td className="row">
            <strong>Born</strong>
          </td>

          <td className="row">
            <strong>Died</strong>
          </td>

          <td className="row">
            <strong>Mother</strong>
          </td>

          <td className="row">
            <strong>Father</strong>
          </td>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (<PersonRow key={person.name} person={person} />))}
      </tbody>
    </table>
  );
};
