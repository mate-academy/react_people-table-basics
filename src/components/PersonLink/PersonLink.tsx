import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { LinkProps } from './Link';

export const PersonLink: React.FC<LinkProps> = ({ person }) => (
  <Link
    className={classNames({ 'has-text-danger': person.sex === 'f' })}
    to={`/people/${person.slug}`}
  >
    {person.name}
  </Link>
);
