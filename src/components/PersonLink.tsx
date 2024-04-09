import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types/Person';
import classNames from 'classnames';

type Props = {
  person: Pick<Person, 'name' | 'sex' | 'slug'>;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const linkClassName = classNames({ 'has-text-danger': person.sex === 'f' });

  return (
    <Link to={`../${person.slug}`} className={linkClassName}>
      {person.name}
    </Link>
  );
};
