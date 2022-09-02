import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person,
  selectPerson: CallableFunction,
};

export const PersonLink: FC<Props> = (props) => {
  const { person, selectPerson } = props;

  return (
    <Link
      className={cn({ 'has-text-danger': person.sex === 'f' })}
      to={`/people/${person.slug}`}
      onClick={() => selectPerson(person.slug)}
    >
      {person.name}
    </Link>
  );
};
