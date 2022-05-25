import React from 'react';
import './PersonRow.scss';

interface Props {
  person: Person;
}

export const PersonRow: React.FC<Props> = ({ person }) => (
  <tr className="PersonRow">
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.motherName || '--no data--'}</td>
    <td>{person.fatherName || '--no data--'}</td>
  </tr>
);
