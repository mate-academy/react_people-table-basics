import React from 'react';
import PropTypes from 'prop-types';

export const PersonRow = ({ person }) => {
  const keys = [
    'name', 'sex', 'born', 'died', 'motherName', 'fatherName',
  ];

  return (
    <tr className="Person">
      {keys.map(key => (
        <td key={key}>
          {person[key]}
        </td>
      ))}
    </tr>
  );
};

PersonRow.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    motherName: PropTypes.string,
    fatherName: PropTypes.string,
  }).isRequired,
};

PersonRow.defaulProps = {
  motherName: 'no mom',
  fatherName: 'no dad',
};
