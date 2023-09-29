import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../../types';

type Props = {
  person: Person,
};

enum Sex {
  FEMALE = 'f',
  MALE = 'm',
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    slug,
  } = person;

  const isFemale = sex === Sex.FEMALE;

  return (
    <Link
      to={`/people/${slug}`}
      className={cn({ 'has-text-danger': isFemale })}
    >
      {name}
    </Link>
  );
};
