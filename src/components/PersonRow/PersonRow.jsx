import React from 'react';
import PropTypes from 'prop-types';

export function PersonRow({
  name,
  sex,
  born,
  died,
  motherName,
  fatherName,
}) {
  return (
    <tr>
      <th>{name}</th>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{motherName}</td>
      <td>{fatherName}</td>
    </tr>
  );
}

PersonRow.propTypes = {
  name: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  born: PropTypes.number.isRequired,
  died: PropTypes.number.isRequired,
  motherName: PropTypes.string,
  fatherName: PropTypes.string,
};

PersonRow.defaultProps = {
  motherName: null,
  fatherName: null,
};
