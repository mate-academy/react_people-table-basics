import { NavLink } from 'react-router-dom';
import { Sex } from '../../types/Sex';
import classNames from 'classnames';
import { Person } from '../../types';

interface PersonLinkProps {
  person: Person;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  return (
    <>
      <NavLink
        to={`/people/${person.slug}`}
        className={classNames({
          'has-text-danger': person.sex === Sex.Female,
        })}
      >
        {person.name}
      </NavLink>
    </>
  );
};
