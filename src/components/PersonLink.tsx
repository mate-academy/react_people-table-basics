import { NavLink } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};
export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <NavLink
      to={`../${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : undefined}
    >
      {person.name}
    </NavLink>
  );
};
