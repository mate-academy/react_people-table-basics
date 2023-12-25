import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person | string;
}

export const PersonLink = ({ person }: Props) => {
  return (
    <td>
      {typeof person === 'string' ? (
        <>{person}</>
      ) : (
        <Link
          to={`/people/${person.slug}`}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {person.name}
        </Link>
      )}
    </td>
  );
};
