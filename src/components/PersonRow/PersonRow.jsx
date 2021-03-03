import React from 'react';
import PropTypes from 'prop-types';

import { ObjectType } from '../../types';

export const PersonRow = ({ person, index }) => (
  <tr>
    <td>{index + 1}</td>
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.motherName}</td>
    <td>{person.fatherName}</td>
  </tr>
);

PersonRow.propTypes = {
  person: ObjectType.isRequired,
  index: PropTypes.number.isRequired,
};
