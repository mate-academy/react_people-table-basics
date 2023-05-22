/* eslint-disable linebreak-style */
import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person;
  handleClick: (arg:string) => void;
}

export const PersonLink: React.FC<Props> = ({ person, handleClick }) => {
  return (
    <td>
      <Link
        to={`/people/${person.slug}`}
        className={classNames({
          'has-text-danger': person.sex === 'm',
        })}
        onClick={() => handleClick(person.slug)}
      >
        {person.name}
      </Link>
    </td>
  );
};
