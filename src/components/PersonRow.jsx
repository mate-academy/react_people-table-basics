import React from 'react';
import PropTypes from 'prop-types';

export const PersonRow = ({
  name,
  sex,
  born,
  died,
  mother,
  father,
}) => (
  <tr>
    <td>{name}</td>
    <td>{sex}</td>
    <td>{born}</td>
    <td>{died}</td>
    <td>{mother}</td>
    <td>{father}</td>
  </tr>
);

PersonRow.defaultProps = {
  mother: null,
  father: null,
};

PersonRow.propTypes = {
  name: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  born: PropTypes.number.isRequired,
  died: PropTypes.number.isRequired,
  mother: PropTypes.string,
  father: PropTypes.string,
};
