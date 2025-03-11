import { NavLink } from 'react-router-dom';
import { Person } from '../../types';

type Prop = {
  person: Person;
};

export const PeopleLink: React.FC<Prop> = ({ person }) => {
  return (
    <NavLink
      to={`${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </NavLink>
  );
};
