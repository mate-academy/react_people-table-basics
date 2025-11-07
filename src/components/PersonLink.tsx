import classNames from 'classnames';
import { Person } from '../types';
import { Link } from 'react-router-dom';

type Props = {
  person: Person | null;
  name: string | null;
};

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  if (!name) {
    return <span>-</span>;
  }

  if (!person) {
    return <span>{name}</span>;
  }

  const linkClass = classNames({ 'has-text-danger': person.sex === 'f' });

  return (
    <Link to={`/people/${person.slug}`} className={linkClass}>
      {person.name}
    </Link>
  );
};
