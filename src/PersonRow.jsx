import React from 'react';
import PropTypes from 'prop-types';

export const PersonRow = ({ person }) => (
  <tr className="Person">
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.fatherName}</td>
    <td>{person.motherName}</td>
  </tr>
);

PersonRow.propTypes = {
  person: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    fatherName: PropTypes.string,
    motherName: PropTypes.string,
    slug: PropTypes.string.isRequired,
  }).isRequired,
};
