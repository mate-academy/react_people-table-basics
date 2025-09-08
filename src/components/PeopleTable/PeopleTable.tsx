import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  people: Person[];
  selectedSlug?: string;
}

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
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
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({
              'has-background-warning': selectedSlug === person.slug,
            })}
          >
            <td>
              <PersonLink personName={person.name} people={people} />
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
};
