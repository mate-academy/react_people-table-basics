import React from 'react';
import { Person } from '../type/type';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="table people-table">
      <thead>
        <tr>
          <th className="table is-hoverable">
            Name
          </th>
          <th className="table is-hoverable">
            Sex
          </th>
          <th className="table is-hoverable">
            Born
          </th>
          <th className="table is-hoverable">
            Died
          </th>
          <th className="table is-hoverable">
            Father
          </th>
          <th className="table is-hoverable">
            Mother
          </th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr key={person.name}>
            <td>{person.name}</td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{person.fatherName}</td>
            <td>{person.motherName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
