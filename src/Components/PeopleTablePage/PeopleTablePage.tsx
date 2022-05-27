import React from 'react';
import { PersonalRow } from '../PersonalRow/PersonalRow';

type Props = {
  peoples: People[]
};

export const PeopleTablePage: React.FC<Props> = ({ peoples }) => {
  return (
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
        {peoples.map(person => (
          <PersonalRow
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
