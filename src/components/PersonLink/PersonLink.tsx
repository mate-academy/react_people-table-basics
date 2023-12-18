import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import { Person } from '../../types';

interface PersonLinkProps {
  person: Person;
}

const WOMAN = 'has-text-danger';

export const PersonLink: React.FC<PersonLinkProps> = ({
  person: { name, sex, slug },
}) => (
  <Link
    to={`/people/${slug}`}
    className={cn({
      [WOMAN]: sex === 'f',
    })}
  >
    {name}
  </Link>
);
