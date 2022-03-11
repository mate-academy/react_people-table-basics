import React from 'react';

import PersonRow from '../PersonRow/PersonRow';

import { Person } from '../../types/person';

import './PeopleTable.scss';

type Props = {
  people: Person[]
};

const PeopleTable: React.FC<Props> = ({ people }) => (
  <table className="PeopleTable">
    <thead>
      <tr>
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
        <PersonRow key={person.slug} person={person} />
      ))}
    </tbody>
  </table>
);

export default PeopleTable;
