import { Person } from '../types';
import { NavLink } from 'react-router-dom';

type Props = {
  name: string | null;
  people: Person[];
  onSelect: (name: string) => void;
};

export default function PersonLink({ name, people, onSelect }: Props) {
  if (!name) {
    return <>-</>;
  }

  const person = people.find(p => p.name === name);

  if (!person) {
    return <>{name}</>;
  }

  return (
    <NavLink
      to={`/people/${person.slug}`}
      onClick={() => onSelect(name)}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {name}
    </NavLink>
  );
}
