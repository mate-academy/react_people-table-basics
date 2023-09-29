import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { isFemale } from '../helpers';

const EMPTY_VALUE = '-';

type Props = {
  person: Person | string | null | undefined;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  if (!person) {
    return <>{EMPTY_VALUE}</>;
  }

  if (typeof person === 'string') {
    return <>{person}</>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({
        'has-text-danger': isFemale(person),
      })}
    >
      {person.name}
    </Link>
  );
};
