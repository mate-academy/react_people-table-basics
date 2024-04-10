import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

const FEMALE = 'f';

type Props = {
  person: Pick<Person, 'name' | 'sex' | 'slug'>;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const female = person.sex === FEMALE;

  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({ 'has-text-danger': female })}
    >
      {person.name}
    </Link>
  );
};
