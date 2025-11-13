import classNames from 'classnames';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
  selectedSlug?: string;
}

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => (
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
          className={classNames({
            'has-background-warning': person.slug === selectedSlug,
          })}
        >
          <td>
            <PersonLink person={person} people={people} />
          </td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>
            {person.motherName ? (
              <PersonLink personName={person.motherName} people={people} />
            ) : (
              '-'
            )}
          </td>
          <td>
            {person.fatherName ? (
              <PersonLink personName={person.fatherName} people={people} />
            ) : (
              '-'
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
