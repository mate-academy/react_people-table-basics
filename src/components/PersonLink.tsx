import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

interface Props {
  person?: Person | null;
  name?: string;
}

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  if (!person && !name) {
    return <span>-</span>;
  }

  if (person && person.slug) {
    return (
      <Link
        to={`/people/${person.slug}`}
        className={person.sex === 'f' ? 'has-text-danger' : ''}
      >
        {person.name}
      </Link>
    );
  }

  return <span className="">{person?.name || name}</span>;
};
