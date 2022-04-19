import React from 'react';
import { PersonRow } from './PersonRow';

type Props = {
  arrayOfPeople: Child[],
};

export const PeopleTable: React.FC<Props> = ({ arrayOfPeople }) => {
  return (
    <>
      <table
        className="PeopleTable"
        style={{
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Sex
            </th>
            <th>
              Born
            </th>
            <th>
              Died
            </th>
            <th>
              Mother
            </th>
            <th>
              Father
            </th>
          </tr>
        </thead>
        <tbody>
          {arrayOfPeople.map(person => (
            <PersonRow person={person} />
          ))}
        </tbody>
      </table>
    </>
  );
};
