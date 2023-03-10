import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  persone: Person;
}

export const PersonLink: React.FC<Props> = ({ persone }) => (
  <Link
    to={`/people/${persone.slug}`}
    className={classNames(
      {
        'has-text-danger': persone.sex === 'f',
      },
    )}
  >
    {persone.name}
  </Link>
);
