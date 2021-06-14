import React from 'react';

import './PersonRow.scss';

export const PersonRow = ({
  name,
  sex,
  born,
  died,
  motherName,
  fatherName,
}) => (
  <tr>
    <td>{name}</td>
    <td>{sex}</td>
    <td>{born}</td>
    <td>{died}</td>
    <td>{motherName}</td>
    <td>{fatherName}</td>
  </tr>
);
