import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
  className?: string;
};

export const PersonLink: React.FC<Props> = ({ person, className }) => {
  return (
    <Link to={`/people/${person.slug}`} className={className}>
      {person.name}
    </Link>
  );
};
