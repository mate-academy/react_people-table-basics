import { NavLink } from 'react-router-dom';
import { Person } from '../types/Person';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <NavLink
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : undefined}
    >
      {person.name}
    </NavLink>
  );
};
