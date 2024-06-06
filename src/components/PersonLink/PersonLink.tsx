import { Link } from 'react-router-dom';
import { Person } from '../../types';
import cn from 'classnames';

type PersonLinkProps = {
  person: Person;
};

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const { sex, name, slug } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={cn({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
