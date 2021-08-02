import React from 'react';
import { PersonShape } from '../../types';

export const PersonRow = ({
  id,
  name,
  sex,
  born,
  died,
  father,
  mother,
}) => (
  <>
    <th scope="row">{id}</th>
    <td>{name}</td>
    <td>{sex}</td>
    <td>{born}</td>
    <td>{died}</td>
    <td>{father}</td>
    <td>{mother}</td>
  </>
);

PersonRow.propTypes = PersonShape;
