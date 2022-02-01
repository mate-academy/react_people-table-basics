import React from 'react';
import { Human } from '../../interface/Human__interface';

import './PersonRow.scss';

type Props = {
  person: Human | null,
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <tr className="table__row">
      <td className="table__cell">{person?.name}</td>
      <td className="table__cell">{person?.sex}</td>
      <td className="table__cell">{person?.born}</td>
      <td className="table__cell">{person?.died}</td>
      <td className="table__cell">{person?.motherName}</td>
      <td className="table__cell">{person?.fatherName}</td>
    </tr>
  );
};
