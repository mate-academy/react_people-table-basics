import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  setSelectedPersonSlug: (slug: string) => void;
};

export const PersonLink: React.FC<Props> = ({
  person, setSelectedPersonSlug,
}) => {
  const { name, slug, sex } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={`${sex === 'f' ? 'has-text-danger' : ''}`}
      onClick={() => setSelectedPersonSlug(slug)}
    >
      {name}
    </Link>
  );
};
