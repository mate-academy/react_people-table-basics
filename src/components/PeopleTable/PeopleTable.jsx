import React from 'react';
import PropTypes from 'prop-types';

export function PeopleTable({ people }) {
  return (
    <table className="PeopleTable table">
      <thead className="thead">
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Sex</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.died - person.born}</td>
            <td>{person.sex}</td>
            <td>{person.motherName}</td>
            <td>{person.fatherName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      died: PropTypes.string.isRequired,
      born: PropTypes.string.isRequired,
      motherName: PropTypes.string.isRequired,
      fatherName: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
