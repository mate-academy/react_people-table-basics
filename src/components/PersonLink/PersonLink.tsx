import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person, PersonSex } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    slug,
  } = person;

  return (
    <Link
      to={`../${slug}`}
      className={classNames({
        'has-text-danger': sex === PersonSex.Female,
      })}
    >
      {name}
    </Link>
  );
};
