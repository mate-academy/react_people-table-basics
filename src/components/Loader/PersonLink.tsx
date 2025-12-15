import { Link } from 'react-router-dom';
import { PersonLinkProps } from '../../types';

export const PersonLink = ({ person, name, people }: PersonLinkProps) => {
  const currentPerson = person || people.find(p => p.name === name);

  if (!currentPerson) {
    return <span>{name}</span>;
  }

  const className = currentPerson.sex === 'f' ? 'has-text-danger' : '';

  return (
    <Link to={`/people/${currentPerson.slug}`} className={className}>
      {currentPerson.name}
    </Link>
  );
};
