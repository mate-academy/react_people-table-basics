import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { Person } from '../types';

type PersonLinkProps = {
  person?: Person;
  personParent?: string | null;
};

export const PersonLink = ({ person, personParent }: PersonLinkProps) => {
  if (person === undefined) {
    return <>{personParent || '-'}</>;
  }

  return (
    <Link
      className={classNames({ 'has-text-danger': person?.sex === 'f' })}
      to={`/people/${person?.slug}`}
    >
      {person?.name}
    </Link>
  );
};
