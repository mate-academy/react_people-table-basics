import React from 'react';

import './PersonRow.scss';

type Props = {
  person: Person,
};

export const PersonRow: React.FC<Props> = ({ person }) => (
  <tr className="Person">
    <td className="Person__cell">{person.name}</td>
    <td className="Person__cell">{person.sex}</td>
    <td className="Person__cell">{person.born}</td>
    <td className="Person__cell">{person.died}</td>
    <td className="Person__cell">{person.motherName}</td>
    <td className="Person__cell">{person.fatherName}</td>
  </tr>
);
