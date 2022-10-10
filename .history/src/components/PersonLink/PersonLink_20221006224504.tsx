import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

interface Props {
  person: Person;
  setSelectedPerson: (str: string) => void;
}

export const PersonLink: FC<Props> = ({ person, setSelectedPerson }) => {
  const {
    name,
    sex,
    slug,
  } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({ 'has-text-danger': sex === 'f' })}
      onClick={() => setSelectedPerson(slug)}
    >
      {name}
    </Link>
  );
};
