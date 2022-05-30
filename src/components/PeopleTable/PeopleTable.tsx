import React from 'react';
import { PersonRow } from '../PersonRow';
import './PeopleTable.scss';

type Props = {
  people: Human[],
};

export const PeopleTable: React.FC<Props> = ({
  people,
}) => {
  return (
    <table className="PeopleTable">
      <thead>
        <tr className="PeopleTable__title">
          <th>name</th>
          <th>sex</th>
          <th>born</th>
          <th>died</th>
          <th>mother</th>
          <th>father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(human => (
          <PersonRow
            key={human.name}
            human={human}
          />
        ))}
      </tbody>
    </table>
  );
};
