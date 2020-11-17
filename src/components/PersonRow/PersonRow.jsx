import React from 'react';
import './PersonRow.scss';
import { PersonRowShape } from '../../shapes/PersonRowShape';

export const PersonRow = ({ person }) => (
  <tr className="Person">
    <td className="Person__cell">{person.name}</td>
    <td className="Person__cell">{person.sex}</td>
    <td className="Person__cell">{person.born}</td>
    <td className="Person__cell">{person.died}</td>
    <td className="Person__cell">{person.motherName}</td>
    <td className="Person__cell">{person.fatherName}</td>
  </tr>
);

PersonRow.propTypes = PersonRowShape;
