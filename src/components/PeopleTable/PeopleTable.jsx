import React from 'react';
import PropTypes from 'prop-types';

import PersonRow from '../PersonRow/PersonRow';

import './PeopleTable.scss';

const PeopleTable = ({ people }) => (
  <table className="PeopleTable">
    <thead>
      <tr>
        <td>name</td>
        <td>sex</td>
        <td>born</td>
        <td>died</td>
        <td>mother</td>
        <td>father</td>
      </tr>
    </thead>
    <tbody>
      {people.map(person => (
        <PersonRow key={person.slug} {...person} />
      ))}
    </tbody>
  </table>
);

export default PeopleTable;

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.any),
  ).isRequired,
};
