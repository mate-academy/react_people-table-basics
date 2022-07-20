import React from 'react';
import { IPeople } from '../../types/types';
import './personRow.scss';

interface Props {
  person: IPeople
}

export const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <tr className="Person">
      <td>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.motherName}</td>
      <td>{person.fatherName}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.slug}</td>
    </tr>
  );
};
