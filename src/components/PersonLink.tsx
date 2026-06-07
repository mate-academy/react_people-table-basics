import classNames from 'classnames';
import { Person } from '../types/Person';
import { NavLink } from 'react-router-dom';

type PersonLinkProps = {
  person: Person;
};

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  return (
    <NavLink
      to={`/people/${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </NavLink>
  );
};
