import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person | undefined;
};

const PersonLink: React.FC<Props> = ({ person }) => {
  const slug = `${person?.name.toLowerCase().replace(/\s+/g, '-')}-${person?.born}`;
  const isFemale = person?.sex === 'f';

  return (
    <Link
      to={`/people/${slug}`}
      className={cn({ 'has-text-danger': isFemale })}
    >
      {person?.name}
    </Link>
  );
};

export default PersonLink;
