import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personId } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable
      is-narrow is-fullwidth"
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
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({
              'has-background-warning': personId === person.slug,
            })}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={cn({
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
              {person.mother ? (
                <PersonLink
                  to={`/people/${person.mother.slug}`}
                  text={person.motherName}
                  hasTextDanger
                />
              ) : (
                person.motherName || '-'
              )}
            </td>

            <td>
              {person.father ? (
                <PersonLink
                  to={`/people/${person.father.slug}`}
                  text={person.fatherName}
                />
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
