import React from 'react';

import './PeopleTable.scss';

export const PeopleTable = ({ people }) => {
  return (
    <table className="PeopleTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>MotherName</th>
          <th>FatherName</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr key={person.slug}>
            <td>{person.name}</td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{person.motherName}</td>
            <td>{person.fatherName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
