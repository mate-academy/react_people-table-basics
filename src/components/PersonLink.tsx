import { NavLink } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person?: Person;
  fallbackName?: string | null;
};

export const PersonLink: React.FC<Props> = ({ person, fallbackName }) => {
  if (person) {
    return (
      <NavLink
        to={`/people/${person.slug}`}
        className={person.sex === 'f' ? 'has-text-danger' : ''}
      >
        {person.name}
      </NavLink>
    );
  }

  return fallbackName || '-';
};
