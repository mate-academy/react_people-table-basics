import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';
import { Loader } from '../Loader';

export const PeopleTable = ({
  isLoading,
  people,
}: {
  isLoading: boolean;
  people: Person[];
}) => {
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th></th>
              <th>Sex</th>
              <th>Born</th>
              <th>Died</th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {people.map(person => (
              <tr
                data-cy="person"
                key={person.name}
                className={
                  person.name === person.slug ? 'has-background-warning' : ''
                }
              >
                <td>
                  <Link
                    to={`/people/${person.slug}`}
                    className={person.sex === 'f' ? 'has-text-danger' : ''}
                  >
                    {person.name}
                  </Link>
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                {person.motherName === person.name ? (
                  <Link to={`/people/${person.slug}`}>{person.motherName}</Link>
                ) : (
                  <td>{person.motherName || '-'}</td>
                )}
                {person.fatherName === person.name ? (
                  <Link to={`/people/${person.slug}`}>{person.fatherName}</Link>
                ) : (
                  <td>{person.fatherName || '-'}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
