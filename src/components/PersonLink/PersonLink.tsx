import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

export type PropsPersonLink = {
  person: Person | undefined,
};

export const PersonLink: React.FC<PropsPersonLink> = ({ person }) => (
  <Link
    className={classNames({
      'has-text-danger': person?.sex === 'f',
    })}
    to={`../${person?.slug}`}
  >
    {person?.name}
  </Link>
);
