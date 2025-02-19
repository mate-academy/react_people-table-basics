import { Link } from 'react-router-dom';
import { Person } from '../../../types/Person';

type Props = {
  person: Person;
  onSelect: (slug: string) => void;
};

export const PersonLink: React.FC<Props> = ({ person, onSelect }) => {
  const { name, sex, slug } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={sex === 'f' ? 'has-text-danger' : ''}
      onClick={() => onSelect(slug)}
    >
      {name}
    </Link>
  );
};
