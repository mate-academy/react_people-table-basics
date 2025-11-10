import { Person } from '../../types';
import { Link } from 'react-router-dom';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink = ({ person, people }: Props) => {
  const foundPerson = people.find(p => p.name === person.name);
  const className = person.sex === 'f' ? 'has-text-danger' : '';

  if (!foundPerson) {
    return <span className={className}>{person.name}</span>;
  }

  return (
    <Link className={className} to={`/people/${foundPerson.slug}`}>
      {foundPerson.name}
    </Link>
  );
};
