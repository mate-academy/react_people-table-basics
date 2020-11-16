import React from 'react';
import PropTypes from 'prop-types';

export const PeopleTable = ({ people }) => (
  <table className="table table-striped mt-5">
    <thead className="thead-dark">
      <tr>
        <th>name</th>
        <th>sex</th>
        <th>born</th>
        <th>died</th>
        <th>mother</th>
        <th>father</th>
      </tr>
    </thead>

    <tbody>
      {people.map(person => (
        <tr key={person.slug}>
          <td>{person.name}</td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>{person.motherName || 'No info about mother'}</td>
          <td>{person.fatherName || 'No info about father'}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    motherName: PropTypes.string,
    fatherName: PropTypes.string,
  })).isRequired,
};
