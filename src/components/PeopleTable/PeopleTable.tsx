import React from 'react';
import { PeopleParents } from '../../types/types';
import { PersonRow } from '../PersonRow';
import './PeopleTable.scss';

type Props = {
  peoples: PeopleParents[] | null;
};

export const PeopleTable: React.FC<Props> = ({
  peoples,
}) => {
  return (
    <table className="table">
      <thead className="table__titles">
        <tr className="table__row">
          <th className="table__cell">Name</th>
          <th className="table__cell">Sex</th>
          <th className="table__cell">Born</th>
          <th className="table__cell">Died</th>
          <th className="table__cell">Father</th>
          <th className="table__cell">Mother</th>
        </tr>
      </thead>
      {peoples && (
        <tbody className="table__body">
          {peoples.map(people => (
            <PersonRow
              person={people}
              key={people.name}
            />
          ))}
        </tbody>
      )}
    </table>
  );
};
