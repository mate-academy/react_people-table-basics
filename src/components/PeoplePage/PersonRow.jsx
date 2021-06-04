import React from 'react';
import PropTypes from 'prop-types';
import { PersonType } from './personType';

export const PersonRow = ({ person, personRows }) => (
  <tr className="Person">
    {personRows.map(personKey => (
      <td key={personKey}>{person[personKey]}</td>
    ))}
  </tr>
);

PersonRow.propTypes = {
  person: PropTypes.shape(PersonType).isRequired,
  personRows: PropTypes.arrayOf(PropTypes.string).isRequired,
};
