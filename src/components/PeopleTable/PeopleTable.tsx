import React from 'react';

import { PersonRow } from '../PersonRow';

interface Props {
  people: Person[]
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {
            Object.keys(people[3]).map(key => (
              <th key={key}>
                {key}
              </th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          people.map(pers => (
            <PersonRow
              key={pers.name}
              person={pers}
            />
          ))
        }
      </tbody>
    </table>
  );
};
