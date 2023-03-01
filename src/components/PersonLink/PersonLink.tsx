import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person
};

export const PersonLink = React.memo<Props>(({ person }) => (
  <NavLink
    to={`/people/${person.slug}`}
    className={() => (
      classNames({
        'has-text-danger': person.sex === 'f',
      })
    )}
  >
    {person.name}
  </NavLink>
));
