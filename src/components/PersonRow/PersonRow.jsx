import React from 'react';
import PropTypes from 'prop-types';

const PersonRow = ({
  name,
  sex,
  born,
  died,
  motherName,
  fatherName,
}) => (
  <tr className="Person">
    <td>{name}</td>
    <td>{sex}</td>
    <td>{born}</td>
    <td>{died}</td>
    <td>{motherName || ' - '}</td>
    <td>{fatherName || ' - '}</td>
  </tr>
);

export default PersonRow;

PersonRow.propTypes = {
  name: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  born: PropTypes.number.isRequired,
  died: PropTypes.number.isRequired,
  motherName: PropTypes.string,
  fatherName: PropTypes.string,
};

PersonRow.defaultProps = {
  motherName: ' - ',
  fatherName: ' - ',
};
