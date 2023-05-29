import { Link } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types/Person';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    slug,
  } = person;

  const isWoman = sex === 'f';

  return (
    <Link
      to={`../${slug}`}
      className={classNames({
        'has-text-danger': isWoman,
      })}
    >
      {name}
    </Link>
  );
};
