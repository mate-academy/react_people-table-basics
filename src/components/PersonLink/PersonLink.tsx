import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
  classActive?: boolean;
};

const PersonLink: React.FC<Props> = ({
  person,
  classActive,
}) => (
  <NavLink
    to={`/people/${person.slug}`}
    className={classNames({ 'has-text-danger': classActive })}
  >
    {person.name}
  </NavLink>
);

export default PersonLink;
