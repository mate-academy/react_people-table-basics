import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { FC } from 'react';
import { Person } from '../types';

type Props = {
  person: Person;
};

const FEMALE = 'f';

export const PersonLink: FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;
  const preparedClassName = classNames({
    'has-text-danger': sex === FEMALE,
  });

  return (
    <Link to={`/people/${slug}`} className={preparedClassName}>
      {name}
    </Link>
  );
};
