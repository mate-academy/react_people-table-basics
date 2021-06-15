import React from 'react';
import PropTypes from 'prop-types';
import { PersonRow } from '../PersonRow';

export const PeopleTable = ({ people }) => (
  <table
    style={{ 'border-collapse': 'collapse' }}
    className="table is-hoverable"
  >
    <thead>
      <th>name</th>
      <th>sex</th>
      <th>born</th>
      <th>died</th>
      <th>mother&aposs name</th>
      <th>father&aposs name</th>
    </thead>

    <tbody>
      {people.map(person => <PersonRow person={person} />)}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
};
