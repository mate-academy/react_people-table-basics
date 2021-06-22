import React from 'react';
import PropTypes from 'prop-types';
import { PersonRow } from '../PersonRow/PersonRow';

export const PeopleTable = ({ people }) => (

  <table className="PeopleTable" style={{ borderCollapse: 'collapse' }}>
    <thead>
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
        <PersonRow person={person} key={person.slug} />
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
    fatherName: PropTypes.string,
    motherName: PropTypes.string,
    slug: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};
