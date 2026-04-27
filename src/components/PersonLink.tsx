import { Person } from '../types';
import { NavLink } from 'react-router-dom';

type Props = {
  person: Person;
};

export default function PersonLink({ person }: Props) {
  return (
    <NavLink
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </NavLink>
  );
}
