import { Link } from 'react-router-dom';
import { Person } from '../../types';
import cn from 'classnames';

type PersonLinkType = {
  person: Person;
};
export const PersonLink: React.FC<PersonLinkType> = ({ person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
