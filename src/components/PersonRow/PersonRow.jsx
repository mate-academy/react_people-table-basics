import React from 'react';
import PropTypes from 'prop-types';

export function PersonRow({ person }) {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.died - person.born}</td>
      <td>{person.sex}</td>
      <td>{person.motherName}</td>
      <td>{person.fatherName}</td>
    </tr>
  );
}

PersonRow.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    died: PropTypes.number,
    born: PropTypes.number.isRequired,
    motherName: PropTypes.string,
    fatherName: PropTypes.string,
    sex: PropTypes.string.isRequired,
  }).isRequired,
};
