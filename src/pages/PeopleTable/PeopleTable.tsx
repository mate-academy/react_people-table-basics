/* eslint-disable no-console */
import React from 'react';
import { Person } from '../../components/Person/Person';
import './PeopleTable.scss';

interface Props {
  people: P[]
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <div>
      <table className="table">
        <thead className="table-header">
          <tr>
            <td>Name</td>
            <td>Sex</td>
            <td>Born</td>
            <td>Died</td>
            <td>Father name</td>
            <td>Mother name</td>
          </tr>
        </thead>
        <tbody>
          {people?.map((person) => (
            <Person key={person?.slug} person={person} />
          ))}

        </tbody>
      </table>
    </div>
  );
};
