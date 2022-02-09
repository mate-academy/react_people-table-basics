import React, { useContext } from 'react';
import { PersonRow, Person } from '../PersonRow';
import { PeopleContext } from '../../PeopleContext';

const mainRow = ['name', 'sex', 'born', 'died', 'father', 'mother'];

export const PeopleTable: React.FC = () => {
  const people = useContext(PeopleContext);

  return (
    <table className="table" style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {mainRow.map((item: string) => (
            <th>
              <abbr title={item}>{item.toUpperCase()}</abbr>
            </th>
          ))}
        </tr>
      </thead>
      {people && people.map((person: Person) => (
        <tbody key={person.died}>
          <PersonRow person={person} />
        </tbody>
      ))}
    </table>
  );
};
