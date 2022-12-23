import { FC, memo } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = memo(({ person }) => {
  const {
    name,
    sex,
    slug,
  } = person;

  return (
    <Link
      to={`../${slug}`}
      className={classNames(
        { 'has-text-danger': sex === 'f' },
      )}
    >
      {name}
    </Link>
  );
});
