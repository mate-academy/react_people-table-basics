import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person?: Person;
  name?: string | null;
  className?: string;
};

export const PersonLink: React.FC<Props> = ({ person, name, className }) => {
  if (person) {
    return (
      <Link to={`/people/${person.slug}`} className={className}>
        {person.name}
      </Link>
    );
  }

  return <>{name || '-'}</>;
};
