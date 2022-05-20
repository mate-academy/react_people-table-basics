import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { PeopleWithParents } from '../../types/people';
import { PersonRow } from '../PersonRow';

import './PeopleTable.scss';

type Props = {
  peoples: PeopleWithParents[] | null;
};

export const PeopleTable: React.FC<Props> = ({
  peoples,
}) => {
  return (
    <table className="PeopleTable">
      <thead className="PeopleTable__head">
        <tr className="PeopleTable__row">
          <th className="PeopleTable__cell">name</th>
          <th className="PeopleTable__cell">sex</th>
          <th className="PeopleTable__cell">born</th>
          <th className="PeopleTable__cell">died</th>
          <th className="PeopleTable__cell">mother</th>
          <th className="PeopleTable__cell">father</th>
        </tr>
      </thead>
      {peoples && (
        <tbody className="PeopleTable__body">
          {peoples.map(people => (
            <PersonRow
              person={people}
              key={uuidv4()}
            />
          ))}
        </tbody>
      )}
    </table>
  );
};
