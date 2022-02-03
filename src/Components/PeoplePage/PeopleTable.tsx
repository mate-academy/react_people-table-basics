import React from 'react';
import './PeoplePage.scss';
import { PersonRow } from './PersonRow';

interface People {
  name: string,
  sex: string,
  born: string,
  died: string,
  motherName: string,
  fatherName: string,
}

type Props = {
  people: People[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table className="PeopleTable">
    <thead>
      <tr>
        <th>name</th>
        <th>sex</th>
        <th>born</th>
        <th>died</th>
        <th>mother</th>
        <th>father</th>
      </tr>
    </thead>

    <tbody>
      {people.map(person => (
        <PersonRow person={person} />
      ))}
    </tbody>
  </table>
);
