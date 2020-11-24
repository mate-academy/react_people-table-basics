import React from 'react';
import { Person } from '../../interfaceForPerson'

export const PersonRow: React.FC<{ person: Person }> = ({ person }) => {
  return (
    <>
  <td>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.father}</td>
      <td>{person.mother}</td>
    </>
  )
}