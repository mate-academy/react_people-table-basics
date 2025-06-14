import { Link } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

export const PeopleTable = ({
  people,
  selectedSlug,
}: {
  people: Person[];
  selectedSlug?: string;
}) => (
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
        <tr
          data-cy="person"
          key={person.slug}
          className={
            selectedSlug === person.slug ? 'has-background-warning' : ''
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
          <td>
            <PersonLink name={person.motherName || ''} people={people} />
          </td>
          <td>
            <PersonLink name={person.fatherName || ''} people={people} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
