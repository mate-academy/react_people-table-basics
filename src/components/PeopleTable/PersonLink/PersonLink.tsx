import { Link } from 'react-router-dom';
import { Person } from '../../../types/Person';

type PersonLinkProps = {
  person: Person,
};

export const PersonLink: React.FC<PersonLinkProps> = (
  { person },
) => {
  return (
    <td>
      <Link
        to={`/people/${person.slug}`}
        className={person.sex === 'f' ? 'has-text-danger' : ''}
      >
        {person.name}
      </Link>
    </td>
  );
};
