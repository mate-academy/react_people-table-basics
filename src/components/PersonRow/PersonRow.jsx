import React from 'react';
import './PersonRow.scss';
import { PersonRowShape } from '../../shapes/PersonRowShape';

export const PersonRow = ({ person }) => (
  <tr className="PersonRow">
    <td className="PersonRow__cell">{person.name}</td>
    <td className="PersonRow__cell">{person.sex}</td>
    <td className="PersonRow__cell">{person.born}</td>
    <td className="PersonRow__cell">{person.died}</td>
    <td className="PersonRow__cell">{person.motherName}</td>
    <td className="PersonRow__cell">{person.fatherName}</td>
  </tr>
);

PersonRow.propTypes = PersonRowShape;
