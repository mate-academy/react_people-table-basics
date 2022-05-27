import React from 'react';
// import { Person } from './react-app-env';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <tbody>
      <tr className="personRow">
        <th>{person.name}</th>
        <th>{person.sex}</th>
        <th>{person.born}</th>
        <th>{person.died}</th>
        <th>{person.motherName || '--'}</th>
        <th>{person.fatherName || '--'}</th>
      </tr>
    </tbody>
  );
};
