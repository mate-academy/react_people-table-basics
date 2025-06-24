import { NavLink } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';

type PersonLinkProps = {
  person: Person;
};

export const PersonLink = ({ person }: PersonLinkProps) => {
  return (
    <NavLink
      to={`/people/${person.slug}`}
      className={cn({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </NavLink>
  );
};
