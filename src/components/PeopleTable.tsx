import React from 'react';

import { PersonRow } from './PersonRow';

export const PeopleTable = ({ people }:any) => {

  return (
    <table className="PeopleTable">
      <thead>
        <tr>
          <td className="PeopleTable__head">Name</td>
          <td className="PeopleTable__head">Sex</td>
          <td className="PeopleTable__head">Born</td>
          <td className="PeopleTable__head">Died</td>
          <td className="PeopleTable__head">Mother</td>
          <td className="PeopleTable__head">Father</td>
        </tr>
      </thead>
      <tbody>
        {people.map((person: any) => (
          <PersonRow person={person} key={people.indexOf(person) + 1}/>
        ))}
      </tbody>
    </table>
  )
};
