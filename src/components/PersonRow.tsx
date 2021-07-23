import React from 'react';

export interface PeopleTableProps {
  person: {[key: string]: any},
}

export const PersonRow = ({ person }: PeopleTableProps) => {
  return (
    <tr
      key={person.name}
      className="tr"
    >
      <td className="td">{person.name}</td>
      <td className="td">{person.sex}</td>
      <td className="td">{person.born}</td>
      <td className="td">{person.died}</td>
      <td className="td">{person.motherName ? person.motherName : '-'}</td>
      <td className="td">{person.fatherName ? person.fatherName : '-'}</td>
    </tr>
  )
}
