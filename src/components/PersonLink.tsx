import { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
  const getTextColor = (sex: 'f' | 'm') => (
    classNames({
      'has-text-danger': sex === 'f',
    })
  );

  return (
    <Link
      to={`../${person.slug}`}
      className={getTextColor(person.sex)}
    >
      {person.name || '-'}
    </Link>
  );
};
