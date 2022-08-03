import React from 'react';
import { People } from '../types/People';

type Props = {
  person: People;
};

const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.motherName}</td>
      <td>{person.fatherName}</td>
    </tr>
  );
};

export default PersonRow;
