import React, { FC } from 'react';
import { PersonInterface } from '../../typedefs';
import './PersonRow.scss';

interface Props {
  person: PersonInterface;
}

export const PersonRow: FC<Props> = ({ person }) => {
  const { name, sex, born, died, motherName, fatherName } = person;
  
  return (
    <tr className="person">
      <td className="person__data">{name}</td>
      <td className="person__data">{sex === 'm' ? 'Man' : 'Woman'}</td>
      <td className="person__data">{born}</td>
      <td className="person__data">{died}</td>
      <td className="person__data">{motherName}</td>
      <td className="person__data">{fatherName}</td>
    </tr>
  );
};
