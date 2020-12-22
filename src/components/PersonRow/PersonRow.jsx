import React from 'react';
import { PropTypes } from 'prop-types';

export const PersonRow = ({ person }) => {
  const { name, sex, born, died, motherName, fatherName } = person;

  return (
    <>
      <td className="Person">{name}</td>
      <td className="Person">{sex === 'f' ? 'Woman' : 'Man'}</td>
      <td className="Person">{born}</td>
      <td className="Person">{died}</td>
      <td className="Person">{motherName}</td>
      <td className="Person">{fatherName}</td>
    </>
  );
};

PersonRow.propTypes = {
  person: PropTypes.object.isRequired,
};
