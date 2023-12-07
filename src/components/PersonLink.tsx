import * as R from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../types';

type Props = {
  person: Person,
};

export const PersonLink: R.FC<Props> = ({
  person: { slug, name, sex },
}) => (
  <Link
    to={`/people/${slug}`}
    className={cn({
      'has-text-danger': sex === 'f',
    })}
  >
    {name}
  </Link>
);
