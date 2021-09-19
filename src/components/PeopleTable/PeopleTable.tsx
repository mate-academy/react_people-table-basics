import React from "react";
import { PersonRow } from "../PersonRow/PersonRow";

import './PeopleTable.scss';

interface Props {
  people: PersonWithParents[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table className="PeopleTable">
    <thead className="PeopleTable__head">
      <tr>
        <th className="head-cell">Name</th>
        <th className="head-cell">Sex</th>
        <th className="head-cell">Born</th>
        <th className="head-cell">Died</th>
        <th className="head-cell">Mother</th>
        <th className="head-cell">Father</th>
      </tr>
    </thead>
    <tbody>
      {people.map(person => (
        <PersonRow {...{person}} />
      ))}
    </tbody>
  </table>
);
