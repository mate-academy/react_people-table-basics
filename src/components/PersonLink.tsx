import { Link } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person?: Person;
  name: string;
  sex?: string;
};

export const PersonLink: React.FC<Props> = ({ person, name, sex }) => {
  const isFemale = person?.sex === 'f' || sex === 'f';

  if (person) {
    return (
      <Link
        to={`/people/${person.slug}`}
        className={classNames({ 'has-text-danger': isFemale })}
      >
        {name}
      </Link>
    );
  }

  return (
    <span className={classNames({ 'has-text-danger': isFemale })}>{name}</span>
  );
};
