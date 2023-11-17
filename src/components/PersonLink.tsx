import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../src/types/Person';

interface Props {
  person: Person | null;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/people/${person?.slug}`}
      className={cn({ 'has-text-danger': person?.sex === 'f' })}
    >
      {person?.name}
    </Link>
  );
};
