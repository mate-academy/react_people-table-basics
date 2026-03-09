import { Link } from 'react-router-dom';
import { Person } from '../types/Person';
import classNames from 'classnames';

type Props = {
  name: string | null;
  people: Person[];
  to?: string;
};

export const PersonLink = ({ name, people, to }: Props) => {
  if (!name) {
    return '-';
  }

  const person = people.find(p => p.name === name);

  if (!person) {
    return name;
  }

  return (
    <Link
      to={to || `/people/${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
