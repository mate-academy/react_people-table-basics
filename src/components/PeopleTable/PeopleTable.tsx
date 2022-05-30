import React from 'react';
import { PersonWithParents } from '../../react-app-env';
import { PersonRow } from '../PersonRow/PersonRow';

import './PeopleTable.scss';

interface Props {
  people: PersonWithParents[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table className="peopleTable">
    <thead className="peopleTable__names">
      <tr className="peopleTable__rows">
        <th className="peopleTable__cell">Name</th>
        <th className="peopleTable__cell">Sex</th>
        <th className="peopleTable__cell">Born</th>
        <th className="peopleTable__cell">Died</th>
        <th className="peopleTable__cell">Mother</th>
        <th className="peopleTable__cell">Father</th>
      </tr>
    </thead>

    {people && (
      <tbody className="peopleTable__body">
        {people.map(human => (
          <PersonRow
            person={human}
            key={human.name}
          />
        ))}
      </tbody>
    )}
  </table>
);
