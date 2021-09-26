import React from 'react';
import PropTypes from 'prop-types';

const PersonRow = ({ person }) => {
  const { name, sex, born, died, motherName, fatherName } = person;

  return (
    <tr>
      <td>{name}</td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{motherName}</td>
      <td>{fatherName}</td>
    </tr>
  );
};

PersonRow.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string,
    sex: PropTypes.string,
    born: PropTypes.number,
    died: PropTypes.number,
    motherName: PropTypes.string,
    fatherName: PropTypes.string,
  }).isRequired,
};

export default PersonRow;
