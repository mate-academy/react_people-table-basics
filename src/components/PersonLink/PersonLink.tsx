import { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: FC<Props> = ({ person, people }) => {
  const isWoman = person.sex === 'f';
  const exists = people.some(p => p.name === person.name);

  if (!exists) {
    return <span>{person.name}</span>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({ 'has-text-danger': isWoman })}
    >
      {person.name}
    </Link>
  );
};
