import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types/Person';

type Props = {
  name?: string;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ name, people }) => {
  if (!name) {
    return <>-</>;
  }

  const person = people.find(p => p.name === name);

  if (!person) {
    return <>{name}</>;
  }

  return (
    <Link
      to={`/people/${person.name}-${person.born}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
