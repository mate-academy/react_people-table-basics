import { NavLink } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

type PersonLinkProps = {
  person: Person | null;
};

export const PersonLink = ({ person }: PersonLinkProps) => {
  return (
    <NavLink
      to={`/people/${person?.slug}`}
      className={classNames({
        'has-text-danger': person?.sex === 'f',
      })}
    >
      {person?.name}
    </NavLink>
  );
};
