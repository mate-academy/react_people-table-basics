import { Link } from 'react-router-dom';
import { Person } from '../../types';
import cn from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      className={cn(person.sex === 'f' && 'has-text-danger')}
      to={`/people/${person.slug}`}
    >
      {person.name}
    </Link>
  );
};
