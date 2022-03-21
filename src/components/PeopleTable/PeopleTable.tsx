import React from 'react';

import './PeopleTable.scss';

import PersonRow from '../PersonRow';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table className="PeopleTable">
    <thead>
      <tr className="PeopleTable__header">
        <th className="PeopleTable__cell">Name</th>
        <th className="PeopleTable__cell">Sex</th>
        <th className="PeopleTable__cell">Born</th>
        <th className="PeopleTable__cell">Died</th>
        <th className="PeopleTable__cell">Mother&apos;s name</th>
        <th className="PeopleTable__cell">Father&apos;s name</th>
      </tr>
    </thead>
    <tbody>
      {people.map(person => (
        <PersonRow person={person} key={person.slug} />
      ))}
    </tbody>
  </table>
);
