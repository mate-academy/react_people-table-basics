import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

type Props = {
  person: Person;
  onClick?: () => void;
};

export const PersonLink: React.FC<Props> = ({ person, onClick }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      onClick={onClick}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
