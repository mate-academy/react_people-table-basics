import React from 'react';
import PropTypes from 'prop-types';
import PersonRow from './PersonRow';

const PeopleTable = ({ people }) => (
  <table
    className="table"
  >
    <thead>
      <tr>
        <th>Name</th>
        <th>Sex</th>
        <th>Born</th>
        <th>Died</th>
        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
    <tbody>
      {people.map(person => (
        <PersonRow key={`${person.name} ${person.born}`} person={person} />
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default PeopleTable;
