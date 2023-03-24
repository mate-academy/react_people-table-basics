import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

interface PersonLinkProps {
  person: Person;
}

export const PersonLink: FunctionComponent<PersonLinkProps> = ({ person }) => (
  <NavLink
    to={`../${person.slug}`}
    className={classNames({
      'has-text-danger': person.sex === 'f',
    })}
  >
    {person.name}
  </NavLink>
);
