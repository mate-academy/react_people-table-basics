import React from 'react';
import PropTypes from 'prop-types';
import { PersonRow } from '../PersonRow/PersonRow';

export const PeopleTable = ({ people }) => (
  <table className="table is-bordered is-fullwidth is-hoverable">
    <thead>
      <tr>
        <th>name</th>
        <td>sex</td>
        <td>born</td>
        <td>died</td>
        <td>mother</td>
        <td>father</td>
      </tr>
    </thead>
    <tbody>
      <PersonRow people={people} />
    </tbody>
  </table>
);

const PeopleType = {
  born: PropTypes.number.isRequired,
  died: PropTypes.number.isRequired,
  father: PropTypes.any,
  fatherName: PropTypes.string,
  mother: PropTypes.any,
  motherName: PropTypes.string,
  sex: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape(PeopleType)).isRequired,
};
