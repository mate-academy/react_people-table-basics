import React, { FC } from 'react';
import { PersonRow } from '../PersonRow';
import { PersonInterface } from '../../typedefs';
import './PeopleTable.scss';

interface Props {
  people: PersonInterface[];
}

export const PeopleTable: FC<Props> = ({ people }) => (
  <table className="PeopleTable">
    <thead>
      <tr>
        <th className="PeopleTable__heading">Name</th>
        <th className="PeopleTable__heading">Sex</th>
        <th className="PeopleTable__heading">Born</th>
        <th className="PeopleTable__heading">Died</th>
        <th className="PeopleTable__heading">Mother</th>
        <th className="PeopleTable__heading">Father</th>
      </tr>
    </thead>
    <tbody>
      {people.map((person: any) => (
        <PersonRow person={person} key={person.name} />
      ))}
    </tbody>
  </table>
);
