import { NavLink } from 'react-router-dom';
import { Person } from '../types';
import { setPersonLinkClassName } from './classNamesSetter';

export const generateNavLink = (person: Person) => {
  return (
    <NavLink to={`/people/${person.slug}`} className={setPersonLinkClassName(person)}>
      {person.name}
    </NavLink>
  );
};
