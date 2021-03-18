import React from 'react';
import { PersonRow } from './PersonRow';

export type Person = {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  slug: string,
}

type People = {
  people: Person[],
}

export const PeopleTable: React.FC<People> = ({ people }) => (
  <div className="peopleTable">
    <p className="peopleTable__Header">People table</p>
    <table className="peopleTable__Body">
      <thead>
        <tr className="peopleTable__rowsHeader">
        <td className="peopleTable__rowsHeader__cell">Name</td>
        <td className="peopleTable__rowsHeader__cell">Sex</td>
        <td className="peopleTable__rowsHeader__cell">Born</td>
        <td className="peopleTable__rowsHeader__cell">Died</td>
        <td className="peopleTable__rowsHeader__cell">Mother</td>
        <td className="peopleTable__rowsHeader__cell">Father</td>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonRow person={person} key={person.slug} />
        ))}
      </tbody>

    </table>
  </div>
)