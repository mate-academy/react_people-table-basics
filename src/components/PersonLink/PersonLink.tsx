import { Link } from 'react-router-dom';
import { Person } from '../../types';
import cn from 'classnames';

type Props = {
  person: Person | null;
  name: string;
};

export const PersonLink = ({ person, name }: Props) => {
  if (!person) {
    return <>{name}</>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={cn({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
