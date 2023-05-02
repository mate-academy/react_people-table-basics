import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => (
  <td>
    <Link
      className={classNames('', {
        'has-text-danger': person.sex === 'f',
      })}
      to={`#/people/${person.slug}`}
    >
      {person.name}
    </Link>
  </td>
);
