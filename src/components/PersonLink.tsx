import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

interface Props {
  person: Person | null | undefined;
  name?: string;
}

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  const isFemale = person?.sex === 'f';

  if (person) {
    return (
      <Link
        to={`/people/${person.slug}`}
        className={isFemale ? 'has-text-danger' : ''}
      >
        {person.name}
      </Link>
    );
  }

  if (name) {
    return <>{name}</>;
  }

  return <>-</>;
};
