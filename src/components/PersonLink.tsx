import { NavLink } from 'react-router-dom';
import { Person } from '../types';

type Props = { person: Person };

export const PersonLink: React.FC<Props> = ({ person }) => {
  const className = person.sex === 'f' ? 'has-text-danger' : '';

  return (
    <NavLink to={`/people/${person.slug}`} className={className}>
      {person.name}
    </NavLink>
  );
};
