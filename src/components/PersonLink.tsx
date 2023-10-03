import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { FEMALE_SEX } from '../utils/constants';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => (
  <Link
    to={`../${person.slug}`}
    className={classNames(
      { 'has-text-danger': person.sex === FEMALE_SEX },
    )}
  >
    {person.name}
  </Link>
);
