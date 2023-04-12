import React from 'react';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({
  person: {
    name,
    sex,
    slug,
  },
}) => (
  <a
    href={`#/people/${slug}`}
    className={classNames(
      {
        'has-text-danger': sex === 'f',
      },
    )}
  >
    {name}
  </a>
);
