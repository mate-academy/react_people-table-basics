import React from 'react';

import { PeopleWithParents } from '../../types/People';

import './PersonRow.scss';

type Props = {
  person: PeopleWithParents;
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <tr className="person__row">
      <td className="person__cell">{person.name}</td>
      <td className="person__cell">{person.sex}</td>
      <td className="person__cell">{person.born}</td>
      <td className="person__cell">{person.died}</td>
      <td className="person__cell">{person.fatherName || '-'}</td>
      <td className="person__cell">{person.motherName || '-'}</td>
    </tr>
  );
};
