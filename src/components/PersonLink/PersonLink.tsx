import { Link } from 'react-router-dom';

import cn from 'classnames';

import { Person } from '../../types';
import { getPerson } from '../../utils';

type Props = {
  people: Person[];
  children: React.ReactNode;
};

export const PersonLink: React.FC<Props> = ({ people, children }) => {
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
        'has-text-danger': result.sex === 'f',
      })}
      to={`/people/${result.slug}`}
    >
      {children}
    </Link>
  );
};
