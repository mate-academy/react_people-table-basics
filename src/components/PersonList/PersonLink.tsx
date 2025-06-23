import { NavLink } from 'react-router-dom';
import { Person } from '../../types';

interface PersonLinkProps {
  person?: Person;
  name?: string;
  people?: Person[];
  onClick?: (slug: string) => void;
}

export const PersonLink = ({
  person,
  name,
  people,
  onClick,
}: PersonLinkProps) => {
  let targetPerson = person;

  if (!targetPerson && name && people) {
    targetPerson = people.find(p => p.name === name);
  }

  if (!targetPerson) {
    return <>{name ?? '-'}</>;
  }

  const className = targetPerson.sex === 'f' ? 'has-text-danger' : undefined;

  const handleClick = () => {
    if (onClick) {
      onClick(targetPerson.slug);
    }
  };

  return (
    <NavLink
      to={`/people/${targetPerson.slug}`}
      className={className}
      onClick={handleClick}
    >
      {targetPerson.name}
    </NavLink>
  );
};
