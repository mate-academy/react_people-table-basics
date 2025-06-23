import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

export const PeopleTable = ({ people }: { people: Person[] }) => {
  const peopleModified = people.map(person => ({
    ...person,
    mother: people.find(p => p.name === person.motherName),
    father: people.find(p => p.name === person.fatherName),
  }));

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
        {peopleModified.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={person.slug === slug ? 'has-background-warning' : ''}
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
            {person.mother ? (
              <td>
                <Link
                  className="has-text-danger"
                  to={person.mother ? `/people/${person.mother.slug}` : ''}
                >
                  {person.motherName ?? '-'}
                </Link>
              </td>
            ) : (
              <td>{person.motherName ?? '-'}</td>
            )}

            {person.father ? (
              <td>
                <Link to={person.father ? `/people/${person.father.slug}` : ''}>
                  {person.fatherName ?? '-'}
                </Link>
              </td>
            ) : (
              <td>{person.fatherName ?? '-'}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
