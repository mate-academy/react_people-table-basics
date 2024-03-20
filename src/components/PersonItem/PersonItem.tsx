import { NavLink } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

interface Props {
  person: Person;
  params: string | undefined;
  people: Person[];
}

export const PersonItem: React.FC<Props> = ({ person, params, people }) => {
  const hasMother = !!person.motherName ? <>{person.motherName}</> : <>-</>;
  const hasFather = person.fatherName ? <>{person.fatherName}</> : <>-</>;

  const arrayIncludesFather =
    people.filter((elem: Person) => person.fatherName === elem.name).length > 0;

  const arrayIncludesMother =
    people.filter((elem: Person) => person.motherName === elem.name).length > 0;

  const isWomen = person.sex === 'f';
  const isActive = params === person.slug;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isActive })}
    >
      <td>
        <NavLink
          to={person.slug}
          className={classNames({ 'has-text-danger': isWomen })}
        >
          {person.name}
        </NavLink>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {arrayIncludesMother ? (
          <NavLink to={person.slug} className="has-text-danger">
            {person.motherName}
          </NavLink>
        ) : (
          hasMother
        )}
      </td>
      <td>
        {arrayIncludesFather ? (
          <NavLink to={person.slug} className="person">
            {person.fatherName}
          </NavLink>
        ) : (
          hasFather
        )}
      </td>
    </tr>
  );
};
