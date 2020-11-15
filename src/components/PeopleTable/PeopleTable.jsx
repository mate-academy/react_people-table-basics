import React from 'react';
import { PersonRow } from '../PersonRow';
import { PeopleTableShape } from '../../shapes/PeopleTableShape';
import './PeopleTable.scss';

export const PeopleTable = ({ people }) => (
  <table className="PeopleTable">
    <thead>
      <tr>
        <th className="PeopleTable__heading">name</th>
        <th className="PeopleTable__heading">sex</th>
        <th className="PeopleTable__heading">born</th>
        <th className="PeopleTable__heading">died</th>
        <th className="PeopleTable__heading">mother</th>
        <th className="PeopleTable__heading">father</th>
      </tr>
    </thead>

    <tbody>
      {people.map(person => (
        <PersonRow
          key={person.born + person.died + person.name}
          person={person}
        />
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = PeopleTableShape;
