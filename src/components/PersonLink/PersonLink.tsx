import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Person } from '../../types';

interface PersonLinkProps {
  person: Person;
}

export const PersonLink: React.FC<PersonLinkProps> = ({
  person: {
    name,
    sex,
    slug,
  },
}) => (
  <NavLink
    to={`/people/${slug}`}
    className={classNames({ 'has-text-danger': sex === 'f' })}
  >
    {name}
  </NavLink>
);
