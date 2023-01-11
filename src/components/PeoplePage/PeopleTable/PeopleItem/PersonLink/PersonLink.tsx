import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../../../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => (
  <NavLink
    to={`/people/${person.slug}`}
    className={cn({ 'has-text-danger': person.sex === 'f' })}
  >
    {person.name}
  </NavLink>
);
