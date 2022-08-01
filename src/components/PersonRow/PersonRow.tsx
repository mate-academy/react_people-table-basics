import React from 'react';
import { People } from '../../types/People';

type Props = {
  person: People,
  numPerson: number,
};

export const PersonRow: React.FC<Props> = ({
  person,
  numPerson,
}) => (
  <tr className="Person">
    <th>{numPerson + 1}</th>
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.fatherName || 'No Father'}</td>
    <td>{person.motherName || 'No Mother'}</td>
  </tr>
);
