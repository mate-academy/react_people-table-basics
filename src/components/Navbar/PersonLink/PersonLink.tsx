import { Link } from 'react-router-dom';
// eslint-disable-next-line import/extensions
import { Person } from '../../types/Person.ts';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => (
  <Link
    to={`/people/${person.slug}`}
    className={person.sex === 'f' ? 'has-text-danger' : ''}
  >
    {person.name}
  </Link>
);
