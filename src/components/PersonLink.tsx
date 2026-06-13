import classNames from 'classnames';
import { Person } from '../types';
import { Link } from 'react-router-dom';

interface Props {
  name: string;
  people: Person[];
}

export const PersonLink = ({ name, people }: Props) => {
  if (!name) {
    return <>-</>;
  }

  const foundPerson = people.find(p => p.name === name);

  if (!foundPerson) {
    return <>{name}</>;
  }

  const linkClass = classNames({
    'has-text-danger': foundPerson.sex === 'f',
  });

  return (
    <Link to={`/people/${foundPerson.slug}`} className={linkClass}>
      {name}
    </Link>
  );
};
