import React from 'react';
import { PeopleWithParents } from '../../types/people';

import './PersonRow.scss';

type Props = {
  person: PeopleWithParents;
};

export const PersonRow: React.FC<Props> = ({
  person,
}) => {
  return (
    <tr className="PeopleTable__row Person">
      <td className="PeopleTable__cell">{person.name}</td>
      <td className="PeopleTable__cell">{person.sex}</td>
      <td className="PeopleTable__cell">{person.born}</td>
      <td className="PeopleTable__cell">{person.died}</td>
      <td className="PeopleTable__cell">{person.motherName || '-'}</td>
      <td className="PeopleTable__cell">{person.fatherName || '-'}</td>
    </tr>
  );
};
