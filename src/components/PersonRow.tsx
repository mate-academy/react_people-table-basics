import React from 'react';
import { Person } from '../type/Person';

type Props = {
  person: Person,
};

export const PersonRow: React.FC<Props> = (props) => {
  const { person } = props;

  return (
    <tr className="field" key={person.slug}>
      <td className="field__data">{person.name}</td>
      <td className="field__data">{person.sex}</td>
      <td className="field__data">{person.born}</td>
      <td className="field__data">{person.died}</td>
      <td className="field__data">
        {person.fatherName ? person.fatherName : 'Unknown'}
      </td>
      <td className="field__data">
        {person.motherName ? person.motherName : 'Unknown'}
      </td>
    </tr>
  );
};
