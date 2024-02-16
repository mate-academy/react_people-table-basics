import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
};

const PersonLink: React.FC<Props> = ({ person }) => {
  const isFemale = person.sex === 'f';

  return (
    <Link
      to={`/people/${person.slug}`}
      className={cn({ 'has-text-danger': isFemale })}
    >
      {person.name}
    </Link>
  );
};

export default PersonLink;
