import cn from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../../types';

interface Props {
  person: Person,
  selectPerson: CallableFunction,
}

export const PersonLink: FC<Props> = (props) => {
  const { person, selectPerson } = props;

  return (
    <Link
      to={`/people/${person.slug}`}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
      onClick={() => selectPerson(person.slug)}
    >
      {person.name}
    </Link>
  );
};
