import React from 'react';

import { v4 as uuidv4 } from 'uuid';

import { PersonRow } from '../PersonRow/PersonRow';

import { PeopleWithParents } from '../../types/People';

import './PersonTable.scss';

type Props = {
  people: PeopleWithParents[] | null;
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="peopletable">
      <thead className="peopletable__titles">
        <tr className="peopletable__row">
          <th className="peopletable__cell">Name</th>
          <th className="peopletable__cell">Sex</th>
          <th className="peopletable__cell">Born</th>
          <th className="peopletable__cell">Died</th>
          <th className="peopletable__cell">Father</th>
          <th className="peopletable__cell">Mother</th>
        </tr>
      </thead>
      {people && (
        <tbody className="peopletable__body">
          {people.map(person => (
            <PersonRow
              person={person}
              key={uuidv4()}
            />
          ))}
        </tbody>
      )}
    </table>
  );
};
