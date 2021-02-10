import React from 'react';
import { TypePerson } from '../../types';

export const Person = ({ person }) => (
  <tr key={person.slug}>
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.mother}</td>
    <td>{person.father}</td>
  </tr>
);

Person.propTypes = TypePerson.isRequired;
Person.defaultTypes = {
  fatherName: '',
  motherName: '',
};
