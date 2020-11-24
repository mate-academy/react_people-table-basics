import React from 'react';
import { PersonRow } from './PersonRow/PersonRow'
import { Person } from '../interfaceForPerson'
import './PeopleTable.scss';


export const PeopleTable: React.FC<{ people: Person[] }> = ({ people }) => {
  return (
    <>
      <table className="peopleTable">
        <thead>
          <tr>
            <th>name</th>
            <th>sex</th>
            <th>born</th>
            <th>died</th>
            <th>father</th>
            <th>mother</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person: Person) => (
            <tr key={person.name}>
              <PersonRow person={person} />
            </tr>

          )
          )}
        </tbody>
      </table>
    </>

  )
}