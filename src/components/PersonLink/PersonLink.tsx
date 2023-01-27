import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
  selectAndShowPerson?: (slug: string) => void;
};

export const PersonLink: React.FC<Props> = React.memo(({
  person,
  selectAndShowPerson,
}) => (
  <Link
    to={`../${person.slug}`}
    className={cn({ 'has-text-danger': person.sex === 'f' })}
    onClick={() => {
      if (selectAndShowPerson) {
        selectAndShowPerson(person.slug);
      }
    }}
  >
    {person.name}
  </Link>
));
