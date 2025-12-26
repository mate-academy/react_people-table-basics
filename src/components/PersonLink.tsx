import { Link } from 'react-router-dom';
import { Person } from '../types';
import { getPersonSlug } from '../utils/PersonSlug';

type Props = {
  person?: Person;
  name?: string | null;
  people?: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, name, people = [] }) => {
  if (!person && !name) {
    return <>-</>;
  }

  const targetPerson = person ?? people.find(p => p.name === name);

  if (!targetPerson) {
    return <>{name}</>;
  }

  const slug = getPersonSlug(targetPerson);

  return (
    <Link
      to={`/people/${slug}`}
      className={targetPerson.sex === 'f' ? 'has-text-danger' : ''}
    >
      {targetPerson.name}
    </Link>
  );
};
