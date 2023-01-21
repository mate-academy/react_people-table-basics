import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
  onScroll?: (slug: string) => void;
};

export const PersonLink: React.FC<Props> = React.memo(
  ({ person, onScroll }) => (
    <Link
      to={`../${person.slug}`}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
      onClick={() => {
        if (onScroll) {
          onScroll(person.slug);
        }
      }}
    >
      {person.name}
    </Link>
  ),
);
