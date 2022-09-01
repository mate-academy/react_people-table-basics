import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

import classNames from "classnames";

type Props = {
  person: Person,
  selectPerson: CallableFunction,
};

export const PersonLink: FC<Props> = ({ person, selectPerson }) => {
  return (
    <Link
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
      to={`/people/${person.slug}`}
      onClick={() => selectPerson(person.slug)}
    >
      {person.name}
    </Link>
  );
};