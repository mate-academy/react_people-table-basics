import React from 'react';
import PropTypes from 'prop-types';

export const PersonRow = ({
  name,
  sex,
  born,
  died,
  motherName: mother,
  fatherName: father,
}) => (
  <tr className="Person">
    <td>{name}</td>
    <td>{sex}</td>
    <td>{born}</td>
    <td>{died}</td>
    <td>{mother}</td>
    <td>{father}</td>
  </tr>
);

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
