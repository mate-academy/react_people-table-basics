import cN from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;

  return (
    <Link
      className={cN({ 'has-text-danger': sex === 'f' })}
      to={`/people/${slug}`}
    >
      {name}
    </Link>
  );
};
