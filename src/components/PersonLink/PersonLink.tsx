import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type PersonLinkProps = {
  person: Person;
};

export const PersonLink = ({ person }: PersonLinkProps) => {
  const isWoman = person.sex === 'f';

  return (
    <Link
      to={`/people/${person.slug}`}
      className={cn({
        'has-text-danger': isWoman,
      })}
    >
      {person.name}
    </Link>
  );
};
