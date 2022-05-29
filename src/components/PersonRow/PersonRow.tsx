import React from 'react';
import { Person } from '../../types/Person';
import './PersonRow.scss';

type Props = {
  person: Person
};

export const PersonRow: React.FC<Props> = ({ person }) => (
  <tr className="person">
    <td className="people-table__cell">{person.name}</td>
    <td className="people-table__cell">{person.sex}</td>
    <td className="people-table__cell">{person.born}</td>
    <td className="people-table__cell">{person.died}</td>
    <td className="people-table__cell">{person.motherName}</td>
    <td className="people-table__cell">{person.fatherName}</td>
  </tr>
);
