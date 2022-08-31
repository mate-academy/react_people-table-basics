import { Link } from 'react-router-dom';
import { FC } from 'react';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink: FC<Props> = (props) => {
  const { person } = props;

  return (
    <Link
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
      to={`/people/${person.slug}`}
    >
      {person.name}
    </Link>
  );
};
