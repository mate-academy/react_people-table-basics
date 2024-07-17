import { Person } from '../../types';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PeopleTable: React.FC<Props> = ({ person }) => {
  const { personId } = useParams();
  const selectedPerson = personId ? personId : '';

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedPerson === person.slug,
      })}
    >
      <td>
        <NavLink
          to={`/people/${person.slug}`}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </NavLink>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {person.mother ? (
          <NavLink
            to={`/people/${person.mother.slug}`}
            className="has-text-danger"
          >
            {person.motherName}
          </NavLink>
        ) : (
          person.motherName || '-'
        )}
      </td>

      <td>
        {person.father ? (
          <NavLink to={`/people/${person.father.slug}`}>
            {person.fatherName}
          </NavLink>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
