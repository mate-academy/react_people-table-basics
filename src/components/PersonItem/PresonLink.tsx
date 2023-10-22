import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
  children: ReactNode;
};

export const PresonLink: React.FC<Props> = ({ person, children }) => {
  const isFem = person.sex === 'f';

  return (
    <Link to={`../${person.slug}`} className={isFem ? 'has-text-danger' : ''}>
      {children}
    </Link>
  );
};
