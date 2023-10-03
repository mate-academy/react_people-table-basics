import cn from 'classnames';
import { Person } from '../../types';
import { NavLink, useLocation } from 'react-router-dom';

type PersonItemProps = {
  person: Person;
  people: Person[];
};

export const PersonItem = ({ person, people }: PersonItemProps) => {
  const { pathname } = useLocation();
  const mother = people.find(p => p.name === person.motherName) || null;
  const father = people.find(p => p.name === person.fatherName) || null;

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': pathname === `/people/${person.slug}`,
      })}
    >
      <td>
        <NavLink
          to={`/people/${person.slug}`}
          className={cn({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </NavLink>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother
          ? (
            <NavLink
              className="has-text-danger"
              to={`/people/${mother.slug}`}
            >
              {mother.name}
            </NavLink>
          ) : person.motherName || '-'}
      </td>
      <td>
        {father
          ? (
            <NavLink
              to={`/people/${father.slug}`}
            >
              {father.name}
            </NavLink>
          ) : person.fatherName || '-'}
      </td>
    </tr>
  );
};
