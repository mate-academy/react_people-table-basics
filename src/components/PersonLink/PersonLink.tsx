import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
  selectPerson: (slug: string) => void;
};

export const PersonLink: FC<Props> = ({ person, selectPerson }) => {
  const { slug, sex, name } = person;

  return (
    <NavLink
      to={`/people/${slug}`}
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
      onClick={() => selectPerson(slug)}
    >
      {name}
    </NavLink>
  );
};
