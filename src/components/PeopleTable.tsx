import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

const NOTHING = '-';

export const PeopleTable = ({ people }: { people: Person[] }) => {
  const { slug } = useParams<{ slug: string }>();

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
        {people.map((person: Person) => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <Link to={`/people/${person.slug}`} className={classNames({ 'has-text-danger': person.sex === 'f' })}>
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName
                && people.some(man => man.name === person.motherName) ? (
                  <Link
                    to={`/people/${people.find(man => man.name === person.motherName)?.slug || ''
                    }`}
                    className="has-text-danger"
                  >
                    {person.motherName}
                  </Link>
                ) : (
                  person.motherName || NOTHING
                )}
            </td>
            <td>
              {person.fatherName
                && people.some(man => man.name === person.fatherName) ? (
                  <Link
                    to={`/people/${people.find(man => man.name === person.fatherName)?.slug || ''
                    }`}
                  >
                    {person.fatherName}
                  </Link>
                ) : (
                  person.fatherName || NOTHING
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
