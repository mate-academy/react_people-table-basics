import React from 'react';
import PropTypes from 'prop-types';

const KEY_NAMES = [
  'name', 'sex', 'born', 'died', 'motherName', 'fatherName',
];

export const PersonRow = ({ person }) => (
  <tr className="Person">
    {KEY_NAMES.map(key => (
      <td key={key}>
        {person[key]}
      </td>
    ))}
  </tr>
);

PersonRow.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string,
    sex: PropTypes.string,
    born: PropTypes.number,
    died: PropTypes.number,
    fatherName: PropTypes.string,
    motherName: PropTypes.string,
  }).isRequired,
};
