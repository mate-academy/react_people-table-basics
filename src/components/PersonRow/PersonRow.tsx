import React from 'react';
import { Person } from '../../types';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { getPersonPath } from '../../utils';

interface Props {
  person: Person;
  isActive: boolean;
  mother?: Person;
  father?: Person;
}

export const PersonRow: React.FC<Props> = ({
  person,
  isActive,
  mother,
  father,
}) => {
  const { name, born, died, sex, motherName, fatherName } = person;

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': isActive,
      })}
    >
      <td>
        <Link
          to={`/people/${getPersonPath(name, born)}`}
          className={cn({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {mother ? (
          <Link
            className="has-text-danger"
            to={`/people/${getPersonPath(mother.name, mother.born)}`}
          >
            {mother.name}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {father ? (
          <Link to={`/people/${getPersonPath(father.name, father.born)}`}>
            {father.name}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
