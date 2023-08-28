import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
import React from 'react';
import { Person } from '../../types/Person';

type Props = {
  person: Person;
  selectedUser: string | undefined;
};

const createLink = (base: string, salt: number) => {
  return `${base.toLowerCase().replace(/\s/g, '-')}-${salt}`;
};

export const TableItem: React.FC<Props> = ({ person, selectedUser }) => {
  const {
    name, sex, born, died, mother, father, motherName, fatherName,
  } = person;

  const personLink = createLink(name, born);

  return (
    <tr
      data-cy="person"
      className={cn(
        { 'has-background-warning': personLink === selectedUser },
      )}
    >
      <td>
        <NavLink
          to={`../${personLink}`}
          className={cn(
            { 'has-text-danger': sex === 'f' },
          )}
        >
          {person.name}
        </NavLink>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {!motherName && (
          '-'
        )}

        {mother && (
          <Link
            to={`../${createLink(mother.name, mother.born)}`}
            className="has-text-danger"
          >
            {mother.name}
          </Link>
        )}

        {motherName && !mother && (
          <>{motherName}</>
        )}
      </td>

      <td>
        {!fatherName && (
          '-'
        )}

        {father && (
          <Link to={`../${createLink(father.name, father.born)}`}>
            {father.name}
          </Link>
        )}

        {fatherName && !father && (
          <>{fatherName}</>
        )}
      </td>
    </tr>
  );
};
