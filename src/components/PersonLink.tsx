import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types';
import { AppRoute, Sex } from '../enums';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;

  return (
    <Link
      className={classNames({ 'has-text-danger': sex === Sex.FEMALE })}
      to={`${AppRoute.ROOT}${AppRoute.PEOPLE}/${slug}`}
    >
      {name}
    </Link>
  );
};
