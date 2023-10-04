import { memo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { SEX_FEMALE } from '../constants';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = memo(({ person }) => {
  const { slug, name, sex } = person;

  return (
    <Link
      to={`../${slug}`}
      className={classNames({
        'has-text-danger': sex === SEX_FEMALE,
      })}
    >
      {name}
    </Link>
  );
});
