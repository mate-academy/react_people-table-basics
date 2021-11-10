import React from 'react';
import { People } from '../../types/peopleType';

type PersonRowProps = {
  person: People,
};

export const PersonRow: React.FC<PersonRowProps> = (props: PersonRowProps) => {
  const { person } = props;

  return (
    <>
      <tr>
        <td>
          {person.name}
        </td>
        <td>
          {person.sex}
        </td>
        <td>
          {person.born}
        </td>
        <td>
          {person.died}
        </td>
        <td>
          {person.motherName }
        </td>
        <td>
          {person.fatherName }
        </td>
      </tr>
    </>
  );
};
