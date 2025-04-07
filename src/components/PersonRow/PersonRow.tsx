import React from 'react';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person;
  mother: Person | undefined;
  father: Person | undefined;
  isActive: boolean;
};

export const PersonRow: React.FC<Props> = ({
  person,
  mother,
  father,
  isActive,
}) => {
  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': isActive,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? <PersonLink person={mother} /> : person.motherName || '-'}
      </td>
      <td>
        {father ? <PersonLink person={father} /> : person.fatherName || '-'}
      </td>
    </tr>
  );
};
