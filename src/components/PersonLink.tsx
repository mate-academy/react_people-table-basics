import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  name: string;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ name, people }) => {
  if (!name) {
    return <>-</>;
  }

  const matched = people.find(person => person.name === name);

  if (!matched) {
    return <>{name}</>;
  }

  const isFemale = matched.sex === 'f';

  return (
    <Link
      to={`/people/${matched.slug}`}
      className={isFemale ? 'has-text-danger' : ''}
    >
      {matched.name}
    </Link>
  );
};
