import { Person } from '../types';
import { NavLink } from 'react-router-dom';

type Props = {
  person: Person | null;
  name?: string | null;
};

export default function PersonLink({ person, name }: Props) {
  if (!person && !name) {
    return <>-</>;
  }

  if (!person) {
    return <>{name}</>;
  }

  return (
    <NavLink
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </NavLink>
  );
}
