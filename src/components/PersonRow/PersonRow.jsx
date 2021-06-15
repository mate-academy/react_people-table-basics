import React from 'react';
import PropTypes from 'prop-types';

export const PersonRow = ({ person }) => (
  <tr>
    <td>
      {person.name}
    </td>
    <td>
      {person.sex}
    </td>
    <td>
      {person.born}
    </td>
    <td>
      {person.died}
    </td>
    <td>
      {person.mother.name || '-'}
    </td>
    <td>
      {person.father.name || '-'}
    </td>
  </tr>
);

PersonRow.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sex: PropTypes.number.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    mother: PropTypes.shape().isRequired,
    father: PropTypes.shape().isRequired,
  }).isRequired,
};
