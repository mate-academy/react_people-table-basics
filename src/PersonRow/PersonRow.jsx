import React from 'react';
import PropTypes from 'prop-types';
import { PersonShape } from '../shapes/PersonShape';

export const PersonRow = ({ person }) => (
  <tr className="Person">
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.motherName}</td>
    <td>{person.fatherName}</td>
  </tr>
);

PersonRow.propTypes = {
  person: PropTypes.shape(PersonShape).isRequired,
};
