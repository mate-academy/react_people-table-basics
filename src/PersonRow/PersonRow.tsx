import React from 'react';
import { Person } from '../types';

export const PersonRow = (props: {person: Person}) => {
  const {
    name, sex, born, died, motherName, fatherName,
  } = props.person;

  return (
    <tr>
      <td>{name}</td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{motherName}</td>
      <td>{fatherName}</td>
    </tr>
  );
};
