import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

interface Props {
  person: Person;
  people: Person[];
  name?: string;
}

export const PersonLink = ({ person, people, name }: Props) => {
  const displayName = name || person.name;

  const targetPerson = name ? people.find(p => p.name === name) : person;

  if (!targetPerson) {
    return <span>{displayName}</span>;
  }

  const className = targetPerson.sex === 'f' ? 'has-text-danger' : '';

  return (
    <Link to={`/people/${targetPerson.slug}`} className={className}>
      {displayName}
    </Link>
  );
};
