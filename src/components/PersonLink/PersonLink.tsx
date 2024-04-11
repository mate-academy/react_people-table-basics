import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const isSexFemale = person.sex === 'f';

  return (
    <Link
      className={classNames({
        'has-text-danger': isSexFemale,
      })}
      to={`/people/${person.slug}`}
    >
      {person.name}
    </Link>
  );
};
