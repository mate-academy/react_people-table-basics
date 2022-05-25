/* eslint-disable no-console */
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
          <th className="PeopleTable__cell">Name</th>
          <th className="PeopleTable__cell">Sex</th>
          <th className="PeopleTable__cell">Born</th>
          <th className="PeopleTable__cell">Died</th>
          <th className="PeopleTable__cell">Mother</th>
          <th className="PeopleTable__cell">Father</th>
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
