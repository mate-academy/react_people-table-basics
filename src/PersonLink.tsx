import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from './types';

interface PersonLinkProps {
  person: Person;
  onSelect: (slug: string) => void;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person, onSelect }) => {
  const handleClick = () => {
    onSelect(person.slug);
  };

  return (
    <Link
      to={`people/${person.slug}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
      onClick={handleClick}
    >
      {person.name}
    </Link>
  );
};
