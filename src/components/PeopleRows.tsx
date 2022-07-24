import React, { memo } from 'react';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = memo(
  ({ person }) => {
    return (
      <tr>
        <td>{person.name}</td>
        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>
        <td>{person.motherName || 'Not given'}</td>
        <td>{person.fatherName || 'Not given'}</td>
      </tr>
    );
  },
);
