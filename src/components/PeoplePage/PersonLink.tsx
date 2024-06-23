import React from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({
  person: { name, sex, slug },
}) => {
  return (
    <Link to={`../${slug}`} className={cn({ 'has-text-danger': sex === 'f' })}>
      {name}
    </Link>
  );
};
