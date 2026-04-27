import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import type { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  const location = useLocation();

  return (
    <Link
      // Preserve filters/sorting when selecting another person in the table.
      to={{
        pathname: `/people/${person.slug}`,
        search: location.search,
      }}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
