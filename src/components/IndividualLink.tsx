import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};

const IndividualLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({
        'has-text-info': person.sex === 'm',
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};

export default IndividualLink;
