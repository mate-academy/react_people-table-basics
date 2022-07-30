import React from 'react';
import { PersonRow } from '../PersonRow';

interface Props {
  peoples: People[]
}

export const PeopleTable: React.FC<Props> = ({ peoples }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>sex</th>
        <th>born</th>
        <th>died</th>
        <th>mother</th>
        <th>father</th>
      </tr>
    </thead>

    <tbody>
      {
        peoples.map(people => {
          return (<PersonRow people={people} key={people.name} />);
        })
      }

    </tbody>
  </table>
);
