import React from 'react';
import { Person, PersonSex } from '../types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === PersonSex.Female,
      })}
    >
      {person.name}
    </Link>
  );
};
