import { Link } from 'react-router-dom';
import { Person } from '../../types';
import cn from 'classnames';

type Props = {
  person: Person | undefined;
  name: string | null;
};

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  if (!name) {
    return <span>-</span>;
  }

  if (!person) {
    return <span>{name}</span>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
