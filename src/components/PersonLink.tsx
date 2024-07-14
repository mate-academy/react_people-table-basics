import { Link } from 'react-router-dom';
import { Person } from '../types';
import React from 'react';
import classNames from 'classnames';

interface Props {
  person: Person;
}

export const PersonLink = ({ person }: Props) => (
  <Link
    className={classNames({ 'has-text-danger': person.sex === 'f' })}
    to={`/people/${person.slug}`}
  >
    {person.name}
  </Link>
);
