import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person,
};

const FEMALE = 'f';

function setWomenClass(gender: string) {
  return classNames({
    'has-text-danger': gender === FEMALE,
  });
}

export const PersonLink: React.FC<Props> = ({ person }) => (
  <Link
    to={`/people/${person.slug}`}
    className={setWomenClass(person.sex)}
  >
    {person.name}
  </Link>
);
