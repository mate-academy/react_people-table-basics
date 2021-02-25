import React from 'react';
import { PersonRow } from './PersonRow';
import { Person } from './typesDefinitions'

type PeopleProps = {
  people: Person[];
}

export const PeopleTable: React.FC<PeopleProps> = ({people}) => {

  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>NAME</th>
            <th>SEX</th>
            <th>BORN</th>
            <th>DIED</th>
            <th>MOTHER</th>
            <th>FATHER</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person: Person) => (
          <PersonRow person={person} key={person.slug}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

