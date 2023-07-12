import React from 'react';
import cn from 'classnames';
import { Person } from '../../types';
import { Link } from 'react-router-dom';

interface Props {
  person?: Person;
}

export const PersonLink: React.FC<Props> = ({ person = { slug: '', name: '', sex: ''} }) => {
  const {
    slug,
    name,
    sex,
  } = person;

  return (
    <Link
      to={`${slug}`}
      className={cn({
        "has-text-danger": sex === 'f',
      })}
    >
      {name}
    </Link>
  );
}
