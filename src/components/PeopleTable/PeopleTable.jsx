import React from 'react';
import PropTypes from 'prop-types';
import { PersonRow } from '../PersonRow';

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
          <PersonRow key={person.id} person={person} />
        ))}
      </tbody>
    </table>
  );
}

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      died: PropTypes.number,
      born: PropTypes.number.isRequired,
      motherName: PropTypes.string,
      fatherName: PropTypes.string,
      sex: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
