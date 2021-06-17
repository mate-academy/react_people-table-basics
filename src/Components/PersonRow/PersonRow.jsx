import React from 'react';
import PropTypes from 'prop-types';

export const PersonRow = ({ person, index }) => (
  <tr>
    <th>{index + 1}</th>
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.motherName || 'Not found'}</td>
    <td>{person.fatherName || 'Not found'}</td>
  </tr>
);

PersonRow.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    fatherName: PropTypes.string.isRequired,
    motherName: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};