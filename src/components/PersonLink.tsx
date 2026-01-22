import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  people: Person[];
  personName: string | null;
};

export const PersonLink: React.FC<Props> = ({ people, personName }) => {
  if (!personName) {
    return '-';
  }

  const foundPerson = people.find(person => person.name === personName);

  return foundPerson ? (
    <Link
      to={`/people/${foundPerson.slug}`}
      className={foundPerson.sex === 'f' ? 'has-text-danger' : ''}
    >
      {personName}
    </Link>
  ) : (
    <span>{personName}</span>
  );
};
