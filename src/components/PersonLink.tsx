import classNames from 'classnames';
import React from 'react';
import { Person } from '../types';

type Props = {
  person: Person,
  setPersonSelected: (slug: string) => void
};

export const PersonLink: React.FC<Props> = ({
  person,
  setPersonSelected,
}) => (
  <td>
    <a
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
      href={`#/people/${person.slug}`}
      onClick={() => {
        setPersonSelected(person.slug);
      }}
    >
      {person.name}
    </a>
  </td>
);
