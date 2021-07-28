import React from 'react';
import { PersonType } from '../../types';

import 'bulma';
import './PersonRow.scss';

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
  person: PersonType.isRequired,
};
