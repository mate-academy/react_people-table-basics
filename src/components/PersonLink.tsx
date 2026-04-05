import { Link } from 'react-router-dom';
import { Person } from '../types';

export default function PersonLink({
  person,
  name,
}: {
  person: Person | undefined;
  name: string | null;
}) {
  if (!name) {
    return <span>-</span>;
  }

  if (!person) {
    return <span>{name}</span>;
  } else {
    return (
      <Link
        className={person.sex === 'f' ? 'has-text-danger' : ''}
        to={`/people/${person.slug}`}
      >
        {name}
      </Link>
    );
  }
}
