import cn from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import { Sex } from '../../types/Sex';

type Props = {
  person: Person;
};

export const ParentLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/people/${person?.slug}`}
      className={cn({ 'has-text-danger': person.sex === Sex.Female })}
    >
      {person?.name}
    </Link>
  );
};
