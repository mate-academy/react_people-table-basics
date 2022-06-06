import React from 'react';
import PersoneRow from '../PersoneRow/PersoneRow';
import './PeopleTable.scss';
import { NewPersone } from '../../types';

type Props = {
  people: NewPersone[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="PeopleTable">
      <thead>
        <tr>
          <td>Name</td>
          <td>Sex</td>
          <td>Born</td>
          <td>Died</td>
          <td>Mother</td>
          <td>Father</td>
          <td>Info</td>
        </tr>
      </thead>
      <tbody>
        {people.map(persone => (
          <PersoneRow persone={persone} key={persone.id} />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Name</td>
          <td>Sex</td>
          <td>Born</td>
          <td>Died</td>
          <td>Mother</td>
          <td>Father</td>
          <td>Info</td>
        </tr>
      </tfoot>
    </table>
  );
};
