import React from 'react';
import PropTypes from 'prop-types';

import { PersonRow } from '../PersonRow/PersonRow';

export const PeopleTable = ({ people }) => (
  <table className="table">
    <thead>
      <tr>
        <td>Name</td>
        <td>Sex</td>
        <td>Born</td>
        <td>Died</td>
        <td>Mother</td>
        <td>Father</td>
      </tr>
    </thead>
    <tbody>
      {people.map(person => (
        <PersonRow key={person.slug} {...person} />
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
};
