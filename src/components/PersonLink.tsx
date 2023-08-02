import { Link } from 'react-router-dom';
import React from 'react';
import cn from 'classnames';
import { Person } from '../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({
  person: { sex, name, slug },
}) => (
  <td>
    <Link
      className={cn({
        'has-text-danger': sex === 'f',
      })}
      to={`/people/${slug}`}
    >
      {name}
    </Link>
  </td>
);
