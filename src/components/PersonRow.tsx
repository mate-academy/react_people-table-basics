import React from 'react';

export const PersonRow = ({ person }:any) => {
  return (
    <tr>
      <td className="PeopleTable__item">{person.name}</td>
      <td className="PeopleTable__item">{person.born}</td>
      <td className="PeopleTable__item">{person.sex}</td>
      <td className="PeopleTable__item">{person.died}</td>
      <td className="PeopleTable__item">{person.motherName}</td>
      <td className="PeopleTable__item">{person.fatherName}</td>
    </tr>
  )
}
