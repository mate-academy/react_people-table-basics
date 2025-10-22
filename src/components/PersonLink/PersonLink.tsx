import React from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  person: Person;
};

const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      to={`${person.slug}`}
      className={cn({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};

export default PersonLink;
