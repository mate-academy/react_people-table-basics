import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, name, sex } = person;

  return (
    <Link
      className={cn({ 'has-text-danger': sex === 'f' })}
      to={`/people/${slug}`}
    >
      {name}
    </Link>
  );
};
