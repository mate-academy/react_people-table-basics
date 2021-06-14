import React from 'react';
import PropTypes from 'prop-types';

export const PersonRow = ({ person }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{(person.mother) ? person.mother.name : '-'}</td>
    <td>{(person.father) ? person.father.name : '-'}</td>
  </tr>
);

PersonRow.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    mother: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    father: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
