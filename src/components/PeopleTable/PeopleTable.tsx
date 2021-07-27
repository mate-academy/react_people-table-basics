import React from 'react';
import { PersonRow } from '../PersonRow/PersonRow';
import './PeopleTable.scss';

export interface PeopleType {
  people: {[key: string]: any}[],
}

export const PeopleTable = ({ people }: PeopleType) => {
  return (
    <table className="PeopleTable">
      <thead>
        <tr>
          {Object.keys(people[0]).filter(elem => elem !== 'slug' && elem !== 'fatherName' && elem !== 'motherName').map((key, index) => (
            <td key={index}>
              {key}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {people && people.map((person, index) => (
          <React.Fragment key={index}>
            <PersonRow person={person} />
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};
