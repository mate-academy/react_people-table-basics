import React from 'react';
import { Person } from '../types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
type Props = {
  person: Person;
  handleClick: (
    slug: string,
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => void;
};

export const PersonLink: React.FC<Props> = ({ person, handleClick }) => {
  return (
    <>
      <Link
        className={classNames({ 'has-text-danger': person.sex === 'f' })}
        to={`../${person.slug}`}
        onClick={e => handleClick(person.slug, e)}
      >
        {person.name}
      </Link>
    </>
  );
};
