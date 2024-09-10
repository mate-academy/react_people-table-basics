import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Person } from '../types';

interface Props {
  person: Person;
}

const PersonLink: FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};

export default PersonLink;
