import { PeopleTableProps } from '../../types';
import { PersonLink } from './PersonLink';

export const PeopleTable = ({ people, selectedSlug }: PeopleTableProps) => (
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
          key={person.slug}
          data-cy="person"
          className={
            person.slug === selectedSlug ? 'has-background-warning' : ''
          }
        >
          <td>
            <PersonLink person={person} people={people} />
          </td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>
            {person.motherName ? (
              <PersonLink name={person.motherName} people={people} />
            ) : (
              '-'
            )}
          </td>
          <td>
            {person.fatherName ? (
              <PersonLink name={person.fatherName} people={people} />
            ) : (
              '-'
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
