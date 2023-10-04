/* eslint-disable no-console */
import { NavLink, useLocation } from 'react-router-dom';
import { Person } from '../../types';

export const PersonRow:React.FC<{
  person: Person,
  people: Person[]
}> = ({ person, people }) => {
  const mother = people.find(p => p.name === person.motherName) || null;
  const father = people.find(p => p.name === person.fatherName) || null;
  const getName = (name:string | null) => (!name ? '-' : name);

  const { pathname } = useLocation();

  return (
    <tr
      data-cy="person"
      className={pathname === `/people/${person.slug}`
        ? 'has-background-warning'
        : ''}
    >
      <td>
        <NavLink to={`/people/${person.slug}`} className={person.sex === 'm' ? '' : 'has-text-danger'}>
          {person.name}
        </NavLink>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <NavLink
            to={`/people/${mother.slug}`}
            className="has-text-danger"
          >
            {person.motherName}
          </NavLink>
        ) : getName(person.motherName) }

      </td>
      <td>
        {father ? (
          <NavLink to={`/people/${father.slug}`}>
            {person.fatherName}
          </NavLink>
        ) : getName(person.fatherName) }

      </td>
    </tr>
  );
};
