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
  if (isLoading) {
    return <Loader />;
  }

  if (people.length === 0) {
    return (
      <>
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      </>
    );
  }

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
          <tr data-cy="person" key={person.name}>
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
            <td>
              {people.find(p => person.motherName === p.name) ? (
                <Link
                  to={`/people/${person.slug}`}
                  className={
                    person.sex ||
                    people.find(p => p.name === person.motherName)?.sex === 'f'
                      ? 'has-text-danger'
                      : ''
                  }
                >
                  {person.motherName}
                </Link>
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {people.find(p => person.fatherName === p.name) ? (
                <Link to={`/people/${person.slug}`}>{person.fatherName}</Link>
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
