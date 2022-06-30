import React from 'react';
import { PeopleRow } from '../PeopleRow';
import './PeopleTable.scss';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="PeopleTable table">
      <thead className="thead">
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody className="tbody">
        {people.map(person => (
          <PeopleRow person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
