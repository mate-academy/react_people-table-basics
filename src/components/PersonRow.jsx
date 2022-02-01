/* eslint-disable react/prop-types */
import React from 'react';

export const PersonRow = ({ person }) => (
  <>
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.motherName}</td>
    <td>{person.fatherName}</td>
  </>
);
