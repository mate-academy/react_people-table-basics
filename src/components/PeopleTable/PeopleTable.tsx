import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

export const PeopleTable = ({ people }: { people: Person[] }) => {
  const { personSlug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(({
          name,
          sex,
          born,
          died,
          fatherName,
          motherName,
          slug,
          mother = people.find(user => user.name === motherName),
          father = people.find(user => user.name === fatherName),
        }) => (
          <tr
            data-cy="person"
            className={classNames({
              'has-background-warning': personSlug === slug,
            })}
          >
            <td>
              <Link
                to={`../${slug}`}
                className={classNames({ 'has-text-danger': sex === 'f' })}
              >
                {name}
              </Link>
            </td>

            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>
            <td>
              {mother ? (
                <Link
                  to={`../${mother.slug}`}
                  className="has-text-danger"
                >
                  {mother.name}
                </Link>
              )
                : motherName || '-'}
            </td>

            <td>
              {father ? (
                <Link
                  to={`../${father.slug}`}
                >
                  {father.name}
                </Link>
              )
                : fatherName || '-'}
            </td>

          </tr>
        ))}

      </tbody>
    </table>
  );
};
