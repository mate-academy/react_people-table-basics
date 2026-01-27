import { Link } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  name: string;
  sex?: string;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ name, sex, people }) => {
  const foundPerson = people.find(person => person.name === name);
  const isFemale = foundPerson?.sex === 'f' || sex === 'f';

  if (foundPerson) {
    return (
      <Link
        to={`/people/${foundPerson.slug}`}
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
