import React from 'react';
import { PersonRow } from './PersonRow';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="table is-bordered">
      <tr>
        <th>Name</th>
        <th>Sex</th>
        <th>Born</th>
        <th>Died</th>
        <th>Mother</th>
        <th>Father</th>
      </tr>
      {people.map((person) => {
        return (
          <React.Fragment key={person.slug}>
            <PersonRow person={person} />
          </React.Fragment>
        );
      })}
    </table>
  );
};
