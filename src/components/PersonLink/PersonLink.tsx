import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  const isWoman: boolean = person.sex === 'f';

  return (
    <Link
      to={`/people/${person.slug}`}
      className={isWoman ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
