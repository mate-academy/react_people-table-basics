import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { Sex } from '../../types/Sex';

interface Props {
  person?: Person;
  name?: string;
}

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  if (!person) {
    return <>{name || '-'}</>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({ 'has-text-danger': person.sex === Sex.FEMALE })}
    >
      {person.name}
    </Link>
  );
};
