import React from 'react';
import './PeopleTable.scss';
import { PersonRow } from '../PersonRow/PersonRow';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table className="PeopleTable">
    <th>name</th>
    <th>sex</th>
    <th>born</th>
    <th>died</th>
    <th>mother</th>
    <th>father</th>

    <tbody>
      {people.map((person) => (
        <PersonRow person={person} key={person.slug} />
      ))}
    </tbody>
  </table>
);
