import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  name?: string | null;
  resolve: (name: string) => Person | null;
};

export const PersonLink = ({ name, resolve }: Props) => {
  if (!name) {
    return <span>-</span>;
  }

  const person = resolve(name);

  if (!person) {
    return <span>{name}</span>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : 'has-text-link'}
    >
      {name}
    </Link>
  );
};
