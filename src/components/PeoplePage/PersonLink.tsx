import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person | undefined;
}

export const PersonLink = ({ person }: Props) => {
  return (
    <>
      <Link
        to={`/people/${person?.slug}`}
        className={person?.sex === 'f' ? 'has-text-danger' : undefined}
      >
        {person?.name}
      </Link>
    </>
  );
};
