import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person?: Person;
  name?: string;
};

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  if (!person) {
    return <>{name}</>;
  }

  const slug = `${person.name.toLowerCase().replace(/\s+/g, '-')}-${person.born}`;
  const isFemale = person.sex === 'f';

  return (
    <Link to={`/people/${slug}`} className={isFemale ? 'has-text-danger' : ''}>
      {person.name}
    </Link>
  );
};
