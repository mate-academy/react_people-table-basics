import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import { FEMALE_GENDER } from '../../constants';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => (
  <Link
    to={person.slug}
    className={classNames({
      'has-text-danger': person.sex === FEMALE_GENDER,
    })}
  >
    {person.name}
  </Link>
);
