import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';
import classNames from 'classnames';

type Props = {
  people: Person[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  onSelect,
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
          key={person.slug}
          data-cy="person"
          className={classNames({
            'has-background-warning': selectedSlug === String(person.slug),
          })}
          onClick={() => onSelect(person.slug)}
          style={{ cursor: 'pointer' }}
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
