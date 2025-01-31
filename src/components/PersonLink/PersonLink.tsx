import { FC } from 'react';
import { Person } from '../../types';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

interface Props {
  person?: Person | null;
  parentName?: string;
}

export const PersonLink: FC<Props> = ({ person, parentName }) => {
  if (!person) {
    return <span>{parentName || '-'}</span>;
  }

  return (
    <NavLink
      to={`/people/${person.slug}`}
      className={classNames('', {
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </NavLink>
  );
};
