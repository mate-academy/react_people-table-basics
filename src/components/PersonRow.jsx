import React from 'react';
import PropTypes from 'prop-types';

export const PersonRow = ({ person }) => (
  <>
    <tr key={person.name}>
      <th>{person.name}</th>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.fatherName}</td>
      <td>{person.motherName}</td>
    </tr>
  </>
);

PersonRow.propTypes = {
  person: PropTypes.objectOf.isRequired,
};
