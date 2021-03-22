import React from 'react';
import { PersonRow } from './PersonRow';

const tableHeaders = ['Name','Sex','Born','Died','Mother','Father'];

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
          {tableHeaders.map(header => (
            <td
              key={header} 
              className="peopleTable__rowsHeader peopleTable__cell"
            >
              {header}
            </td>
          ))}
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