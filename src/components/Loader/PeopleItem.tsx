import { NavLink, useParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

type PersonPageProps = {
  person: Person;
};

export const PeopleItem: React.FC<PersonPageProps> = ({ person }) => {
  const { personId } = useParams();
  const selectedPersonId = personId ? personId : '';

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedPersonId === person.slug,
      })}
    >
      {/* className="has-background-warning" */}
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
      {person.mother ? (
        <td>
          <NavLink
            to={`/people/${person.mother.slug}`}
            className="has-text-danger"
          >
            {person.motherName}
          </NavLink>
        </td>
      ) : (
        <td>{person.motherName || '-'}</td>
      )}

      {person.father ? (
        <td>
          <NavLink to={`/people/${person.father.slug}`}>
            {person.fatherName}
          </NavLink>
        </td>
      ) : (
        <td>{person.fatherName || '-'}</td>
      )}
    </tr>
  );
};
