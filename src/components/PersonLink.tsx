import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
};

const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/people/${person?.slug}`}
      className={classNames({
        'has-text-danger': person && person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};

export default PersonLink;
