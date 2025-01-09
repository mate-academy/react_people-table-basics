import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

export const Persona: React.FC<{ peopl: Person; people: Person[] }> = ({
  peopl,
  people,
}) => {
  const { peopleSlug } = useParams();
  const selectPeople = peopleSlug;

  const motherThisTable = people.find(
    person => person.name === peopl.motherName,
  );
  const fatherThisTable = people.find(
    person => person.name === peopl.fatherName,
  );
  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': peopl.slug === selectPeople,
      })}
    >
      {peopl.slug === selectPeople ? (
        <td>
          <Link
            to=".."
            className={classNames({ 'has-text-danger': peopl.sex === 'f' })}
          >
            {peopl.name}
          </Link>
        </td>
      ) : (
        <td>
          <Link
            to={`../${peopl.slug}`}
            className={classNames({ 'has-text-danger': peopl.sex === 'f' })}
          >
            {peopl.name}
          </Link>
        </td>
      )}
      <td>{peopl.sex}</td>
      <td>{peopl.born}</td>
      <td>{peopl.died}</td>
      <td>
        {motherThisTable ? (
          <Link
            to={`/people/${motherThisTable.slug}`}
            className="has-text-danger"
          >
            {peopl.motherName}{' '}
          </Link>
        ) : (
          <>{peopl.motherName ? peopl.motherName : '-'}</>
        )}
      </td>
      <td>
        {fatherThisTable ? (
          <Link to={`/people/${fatherThisTable.slug}`}>{peopl.fatherName}</Link>
        ) : (
          <>{peopl.fatherName ? peopl.fatherName : '-'}</>
        )}
      </td>
    </tr>
  );
};
