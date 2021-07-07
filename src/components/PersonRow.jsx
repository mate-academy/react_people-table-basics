import React from 'react';
import PropTypes from 'prop-types';

export function PersonRow({ person }) {
  return (
    <tr className="Person">
      <td>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.motherName}</td>
      <td>{person.fatherName}</td>
    </tr>
  );
}

PersonRow.propTypes = {
  person: PropTypes.objectOf(PropTypes.string).isRequired,
};
