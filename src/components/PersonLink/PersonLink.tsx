import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person | null;
  name: string | null;
}

export const PersonLink = ({ person, name }: Props) => {
  return (
    <>
      {!name ? (
        <p>-</p>
      ) : !person ? (
        <p>{name}</p>
      ) : (
        <Link
          to={`/people/${person?.slug}`}
          data-cy="personLink"
          className={person.sex === 'f' ? 'has-text-danger' : undefined}
        >
          {name}
        </Link>
      )}
    </>
  );
};
