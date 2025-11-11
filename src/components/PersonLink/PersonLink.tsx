import { Person } from '../../types';
import { Link } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  const className = person.sex === 'f' ? 'has-text-danger' : '';

  if (!person.slug) {
    return <span className={className}>{person.name}</span>;
  }

  return (
    <Link className={className} to={`/people/${person.slug}`}>
      {person.name}
    </Link>
  );
};
