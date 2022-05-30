import React from 'react';

import './PersonRow.scss';

type Props = {
  human: Human;
};

export const PersonRow: React.FC<Props> = ({
  human,
}) => (
  <tr className="Person">
    <td>{human.name}</td>
    <td style={{ textAlign: 'center' }}>{human.sex}</td>
    <td style={{ textAlign: 'center' }}>{human.born}</td>
    <td style={{ textAlign: 'center' }}>{human.died}</td>
    <td>{human.motherName}</td>
    <td>{human.fatherName}</td>
  </tr>
);
