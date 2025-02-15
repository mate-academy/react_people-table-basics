import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface PersonLinkProps {
  person?: Person;
  nameOverride?: string;
}

export const PersonLink: React.FC<PersonLinkProps> = ({
  person,
  nameOverride,
}) => {
  const name = nameOverride || person?.name || '-';

  if (!person) {
    return <span>{name}</span>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {name}
    </Link>
  );
};
