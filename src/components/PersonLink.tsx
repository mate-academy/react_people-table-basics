import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

const EMPTY_VALUE = '-';
const SEX_FEMALE = 'f';

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

  const { slug, name, sex } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({
        'has-text-danger': sex === SEX_FEMALE,
      })}
    >
      {name}
    </Link>
  );
};
