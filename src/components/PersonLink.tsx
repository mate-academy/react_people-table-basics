import React from 'react';
import { PersonType } from '../types';
import { PersonSex } from '../types/PersonSex';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: PersonType;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({
        'has-text-danger': sex === PersonSex.FEMALE,
      })}
    >
      {name}
    </Link>
  );
};
