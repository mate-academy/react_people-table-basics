import { Link } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person?: Person;
  children?: React.ReactNode;
};

export const PersonLink: React.FC<Props> = ({ person, children }) => {
  if (!person) {
    return <>{children || ''}</>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames('', {
        'has-text-danger': person.sex === 'f',
      })}
    >
      {children || person.name}
    </Link>
  );
};
