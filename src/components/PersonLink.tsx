import { Person } from '../types';
import { Link } from 'react-router-dom';

type Props = {
  person: Person;
};

const PersonLink: React.FC<Props> = ({ person }) => {
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