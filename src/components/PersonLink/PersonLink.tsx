import React from 'react';
import { Person } from '../../types';
import { normalizeSlug } from '../../helper/functionHelp';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person | undefined;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  if (!person) {
    return;
  }

  return (
    <Link
      to={`/people/${normalizeSlug(person?.name)}-${person?.born}`}
      className={classNames({ 'has-text-danger': person?.sex === 'f' })}
    >
      {person?.name}
    </Link>
  );
};
