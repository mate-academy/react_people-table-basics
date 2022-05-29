import React from 'react';
import { PersonRow } from '../PersonRow/PersonRow';

type Props = {
  people: People[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table className="table is-hoverable is-striped PeopleTable">
    <thead>
      <tr className="has-background-white-ter">
        <th>Name</th>
        <th>Sex</th>
        <th>Born</th>
        <th>Died</th>
        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>

    <tbody>
      {people.map(person => (
        <PersonRow person={person} key={person.slug} />
      ))}
    </tbody>
  </table>
);
