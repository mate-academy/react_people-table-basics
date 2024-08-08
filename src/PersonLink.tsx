import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../src/types/Person';
import React, { FC } from 'react';

const FEMALE = 'f';

type Props = {
  person?: Person;
};
export const PersonLink: FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/people/${person?.slug}`}
      className={classNames({
        'has-text-danger': person?.sex === FEMALE,
      })}
    >
      {person?.name}
    </Link>
  );
};
