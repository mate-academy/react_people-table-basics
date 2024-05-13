import { Link } from 'react-router-dom';

import cn from 'classnames';

import { Person } from '../../types';
import { getPerson } from '../../utils';

type Props = {
  person: Person;
  people?: Person[];
  children: React.ReactNode;
};

export const PersonLink: React.FC<Props> = ({ person, children, people }) => {
  const result = getPerson(people, children);

  if (!children) {
    return '-';
  }

  if (!result) {
    return children;
  }

  return (
    <Link
      className={cn({
        'has-text-danger': person.sex === 'f',
      })}
      to={`/people/${result.slug}`}
    >
      {children}
    </Link>
  );
};
