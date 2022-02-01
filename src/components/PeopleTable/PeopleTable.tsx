import React from 'react';
import { Human } from '../../interface/Human__interface';
import { PersonRow } from '../PersonRow';

import './PeopleTable.scss';

type Props = {
  people: Human[] | null,
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="table">
      <thead className="table__head">
        <tr>
          <th>NAME</th>
          <th>SEX</th>
          <th>BORN</th>
          <th>DIED</th>
          <th>MOTHER</th>
          <th>FATHER</th>
        </tr>
      </thead>

      <tbody>
        {people?.map((person) => <PersonRow key={person.name} person={person} />)}
      </tbody>
    </table>

  );
};
