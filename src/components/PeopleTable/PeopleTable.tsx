import React from 'react';
import { PeopleWithParents } from '../../types/People';
import './PeopleTable.scss';

type Props = {
  people: PeopleWithParents[];
};

export const PeopleTable: React.FC<Props> = () => (
  <table className="people-table">
    <thead>
      <tr>
        <th>name</th>
        <th>sex</th>
        <th>born</th>
        <th>died</th>
        <th>mother</th>
        <th>father</th>
      </tr>
    </thead>
    <tbody>...</tbody>
  </table>
);
