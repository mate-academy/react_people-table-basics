import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  return (
    <table
      className="table is-fullwidth is-striped is-hoverable"
      data-cy="peopleTable"
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
              <PersonLink name={person.name} people={people} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died || '-'}</td>
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
};
