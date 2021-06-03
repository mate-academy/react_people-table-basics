import React from 'react';
import PropTypes from 'prop-types';

export const PersonRow = ({ person }) => {
  const { name, sex, born, died, fatherName, motherName } = person;

  return (
    <tr className="Person">
      <td>{name}</td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{fatherName}</td>
      <td>{motherName}</td>
    </tr>
  );
};

PersonRow.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    fatherName: PropTypes.string,
    motherName: PropTypes.string,
    slug: PropTypes.string.isRequired,
  }).isRequired,
};
