import classNames from 'classnames';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = memo(({ person }) => {
  const {
    name,
    slug,
    sex,
  } = person;

  return (
    <Link
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
      to={`../${slug}`}
    >
      {name}
    </Link>
  );
});
