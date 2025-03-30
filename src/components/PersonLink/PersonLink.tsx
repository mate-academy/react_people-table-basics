import React from 'react';
import { Person } from '../../types';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, slug, sex } = person;
  const isWomen = sex === 'f';

  return (
    <td>
      <a
        href={`#/people/${slug}`}
        className={classNames({ 'has-text-danger': isWomen })}
      >
        {name}
      </a>
    </td>
  );
};
