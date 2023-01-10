import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={cn(
        { 'has-text-danger': person.sex === 'f' },
      )}
    >
      {person.name}
    </Link>
  );
};
