import React from 'react';
import PropTypes from 'prop-types';
import { PersonRow } from '../PersonRow/PersonRow';

export const PeopleTable = ({ people }) => (
  <table className="PeopleTable table">
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
        <PersonRow person={person} />
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};
