import React from 'react';
import PropTypes from 'prop-types';
import { PersonRow } from './PersonRow';

export const PeopleTable = ({ people }) => (
  <table className="PeopleTable">
    <thead className="PeopleTable__head">
      <tr>
        <th>Name</th>
        <th>Sex</th>
        <th>Born</th>
        <th>Died</th>
        <th>Father</th>
        <th>Mother</th>
      </tr>
    </thead>
    <tbody className="PeopleTable__body">
      {people.map(person => (
        <PersonRow person={person} />
      ))}
    </tbody>
  </table>

);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
};
