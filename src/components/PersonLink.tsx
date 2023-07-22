import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

interface Props {
  person: Person | undefined,
}

export const PersonLink:React.FC<Props> = ({ person }) => {
  const FEMALE = 'f';

  return (
    <Link
      to={`../people/${person?.slug}`}
      className={cn({ 'has-text-danger': person?.sex === FEMALE })}
    >
      {person?.name}
    </Link>
  );
};
