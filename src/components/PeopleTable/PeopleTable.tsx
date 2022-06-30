import React from 'react';
import { Person } from '../../react-app-env';
import './PeopleTable.scss';
import { PersonRow } from '../PersonRow';

interface Props {
  people: Person[],
}
export const PeopleTable:React.FC<Props> = React.memo(({ people }) => {
  return (
    <>
      <table className="table">
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
          {people.map(person => (
            <PersonRow person={person} />
          ))}
        </tbody>
      </table>

    </>
  );
});
