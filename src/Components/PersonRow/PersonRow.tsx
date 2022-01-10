import React from 'react';

export const PersonRow: React.FC<ProcessedPerson> = ({
  name,
  sex,
  born,
  died,
  motherName,
  fatherName,
}) => (
  <tr className="Person">
    <td>{name}</td>
    <td>{sex}</td>
    <td>{born}</td>
    <td>{died}</td>
    <td>{motherName || '-'}</td>
    <td>{fatherName || '-'}</td>
  </tr>
);
