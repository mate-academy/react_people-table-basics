import { Link } from 'react-router-dom';
import { Person } from '../../types';
import cn from 'classnames';

type Props = {
  person: Person;
};

function PersonLink({ person }: Props) {
  const path = `/people/${person.slug}`;

  return (
    <Link
      className={cn({
        'has-text-danger': person.sex === 'f',
      })}
      to={path}
    >
      {person.name}
    </Link>
  );
}

export default PersonLink;
