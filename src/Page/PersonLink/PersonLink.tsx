import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
  personPerens?: Person | null;
};

export const PersonLink: React.FC<Props> = ({ person, personPerens }) => {
  const targetPerson = personPerens ?? person;

  return (
    <a
      href={`#/people/${targetPerson.slug}`}
      className={classNames({
        'has-text-danger': targetPerson.sex === 'f',
        ' ': targetPerson.sex === 'm',
      })}
    >
      {targetPerson.name}
    </a>
  );
};
