import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';

type Props = {
  mother: Person | string | null,
  father: Person | string | null,
  person: Person,
  selectedPerson: string
};

export const PersonItem: React.FC<Props> = ({
  mother,
  father,
  person,
  selectedPerson,
}) => {
  const { sex, born, died } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === selectedPerson,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        <>
          {(mother && typeof mother === 'object')
            && <PersonLink person={mother} />}
          {(mother && typeof mother === 'string') && `${mother}`}
          {!mother && '-'}
        </>
      </td>
      <td>
        <>
          {(father && typeof father === 'object')
            && <PersonLink person={father} />}
          {(father && typeof father === 'string') && `${father}`}
          {!father && '-'}
        </>
      </td>
    </tr>
  );
};
