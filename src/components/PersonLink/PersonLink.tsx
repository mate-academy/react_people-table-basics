import classNames from 'classnames';
import React from 'react';

type Props = {
  name: string;
  slug: string | null;
  sex?: 'm' | 'f';
};

export const PersonLink: React.FC<Props> = ({ name, slug, sex }) =>
  slug ? (
    <a
      href={'#/people/' + slug}
      className={classNames({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </a>
  ) : (
    name
  );
