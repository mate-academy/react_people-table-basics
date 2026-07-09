import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { getPersonLinkName } from '../utils';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const linkName = '/people/' + getPersonLinkName(person);

  return (
    <Link
      to={linkName}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
