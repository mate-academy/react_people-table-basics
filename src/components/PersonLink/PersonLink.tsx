import { Link } from 'react-router-dom';
import { Person } from '../../types';

type PersonLinkProps = {
  person: Person;
};

export const PersonLink = ({ person }: PersonLinkProps) => {
  return (
    <Link to={`/people/${person.slug}`}>
      {person.name}
    </Link>
  );
};
