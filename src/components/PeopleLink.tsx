import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = { person?: Person | null; name?: string | null };

export const PeopleLink: React.FC<Props> = ({ person, name }) => {
  if (person) {
    return (
      <Link
        to={`/people/${person.slug}`}
        className={person.sex === 'f' ? 'has-text-danger' : ''}
      >
        {name}
      </Link>
    );
  }

  return <span>{name}</span>;
};
