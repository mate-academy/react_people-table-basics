import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();

  return (
    <td>
      <NavLink
        to={slug ? `../${person.slug}` : person.slug}
        className={cn({ 'has-text-danger': person.sex === 'f' })}
      >
        {person.name}
      </NavLink>
    </td>
  );
};
