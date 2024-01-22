import classNames from 'classnames';
import { useParams, Link } from 'react-router-dom';
import { Person } from '../../types';

interface PeopleTableProps {
  people: Person[],
}
export const PeopleTable = (props: PeopleTableProps) => {
  const { people } = props;
  const { slug } = useParams();

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
        {people.map(person => (
          <>
            <tr
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
              data-cy="person"
            >
              <td>
                <Link
                  to={`/people/${person.slug}`}
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother
                  ? (
                    <Link
                      to={`/people/${person.mother?.slug}`}
                      className="has-text-danger"
                    >
                      {person.motherName}
                    </Link>
                  )
                  : person.motherName}
                {!person.motherName && '-'}
              </td>
              <td>
                {person.father
                  ? (
                    <Link
                      to={`/people/${person.father?.slug}`}
                    >
                      {person.fatherName}
                    </Link>
                  )
                  : person.fatherName}
                {!person.fatherName && '-'}
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
};
