import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';

interface Props {
  person: Person,
}

const setPersonClassNameProperty = (sex: string) => classNames({
  'has-text-danger': sex === 'f',
});

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, slug, sex } = person;

  return (
    <a
      className={setPersonClassNameProperty(sex)}
      href={`#/people/${slug}`}
    >
      {name}
    </a>
  );
};
