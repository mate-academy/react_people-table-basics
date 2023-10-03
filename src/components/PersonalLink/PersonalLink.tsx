import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { WOMEN_MALE } from '../../constants/WOMEN_MALE';

type Props = {
  person: Person,
};

export const PersonalLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      to={`../${person.slug}`}
      className={cn({ 'has-text-danger': person.sex === WOMEN_MALE })}
    >
      {person?.name}
    </Link>
  );
};
