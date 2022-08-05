import React from 'react';
import classNames from 'classnames';
import { PeopleTableProps } from '../types';

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  return (
    <table className="table is-bordered is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Father</th>
          <th>Mother</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr key={person.slug} className="person">
            <td>
              {person.name}
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td className={classNames({
              'has-background-danger': !person.fatherName,
            })}
            >
              {person.fatherName}
            </td>
            <td className={classNames({
              'has-background-danger': !person.motherName,
            })}
            >
              {person.motherName}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
