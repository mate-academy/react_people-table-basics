import React from 'react';
import { PeopleRow } from '../PersonRow/PersonRow';

const mainRow = ['name', 'sex', 'born', 'died', 'father', 'mother'];

type Props = {
  people: UpdatedPersons[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <>
      <h1>People table:</h1>
      <table
        className="PeopleTable"
        style={{ borderCollapse: 'collapse' }}
      >
        <thead>
          <tr>
            {mainRow.map((item) => {
              return (
                <th key={item}>
                  {item.toUpperCase()}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {people.map((person) => {
            return (
              <PeopleRow person={person} key={person.slug} />
            );
          })}
        </tbody>
      </table>
    </>
  );
};
