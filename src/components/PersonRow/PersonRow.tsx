import React from 'react';
import { Person } from '../../react-app-env';

import './PersonRow.scss';

interface Props {
  person: Person,
}

export const PersonRow:React.FC<Props> = ({ person }) => (
  <tr className="person__row">
    <td className="person__cell">{person.name}</td>
    <td className="person__cell">{person.sex}</td>
    <td className="person__cell">{person.born}</td>
    <td className="person__cell">{person.died}</td>
    <td className="person__cell">{person.motherName || 'no data'}</td>
    <td className="person__cell">{person.fatherName || 'no data'}</td>
  </tr>
);
