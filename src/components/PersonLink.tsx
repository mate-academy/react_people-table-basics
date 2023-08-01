import { Link } from 'react-router-dom';
import React from 'react';
import cn from 'classnames';
import { Person } from '../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => (
  <td>
    <Link
      className={cn({
        'has-text-danger': person.sex === 'f',
      })}
      to={`/people/${person?.slug}`}
    >
      {person.name}
    </Link>
  </td>
);
