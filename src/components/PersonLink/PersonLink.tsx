import React from 'react';
import { Person as PersonType } from '../../types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  person: PersonType;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, slug, sex } = person;
  const SEX_FEMALE = 'f';

  return (
    <Link
      to={`${slug}`}
      className={cn({ 'has-text-danger': sex === SEX_FEMALE })}
    >
      {name}
    </Link>
  );
};
