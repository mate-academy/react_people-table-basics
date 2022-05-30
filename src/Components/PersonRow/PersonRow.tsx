import React from 'react';
import { PersonWithParents } from '../../types';

type Props = {
  person: PersonWithParents,
};

export const PersonRow: React.FC<Props> = React.memo(({ person }) => {
  return (
    <tr className="Person">
      <td className="PeopleTable__cell">{person.name}</td>
      <td className="PeopleTable__cell">{person.sex}</td>
      <td className="PeopleTable__cell">{person.born}</td>
      <td className="PeopleTable__cell">{person.died}</td>
      <td className="PeopleTable__cell">{person.fatherName || 'no info'}</td>
      <td className="PeopleTable__cell">{person.motherName || 'no info'}</td>
    </tr>
  );
});
