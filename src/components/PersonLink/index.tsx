import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  const isWoman = person.sex === 'f';
  const className = isWoman ? 'has-text-danger' : '';

  return (
    <Link to={`/people/${person.slug}`} className={className}>
      {person.name}
    </Link>
  );
};
