import { Link } from 'react-router-dom';

import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => (
  <Link
    to={`/people/${person.slug}`}
    className={person.sex === 'f' ? 'has-text-danger' : ''}
  >
    {person.name}
  </Link>
);
