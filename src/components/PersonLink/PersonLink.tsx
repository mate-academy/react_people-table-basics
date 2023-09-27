import { Link } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
import { Person, PersonSex } from '../../types';

type Props = {
  person: Person
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;

  return (
    <Link
      to={slug}
      className={
        classNames({
          'has-text-danger': sex === PersonSex.Female,
        })
      }
    >
      {name}
    </Link>
  );
};
