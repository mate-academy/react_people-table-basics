import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Sex } from '../../types/Sex';

type Props = {
  name: string;
  sex: Sex;
  slug: string;
};

export const PersonLink: React.FC<Props> = ({ name, sex, slug }) => {
  return (
    <Link
      to={`../${slug}`}
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
