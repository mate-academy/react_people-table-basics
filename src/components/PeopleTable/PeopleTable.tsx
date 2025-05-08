import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface PeopleTableProps {
  people: Person[];
  selectedSlug: string | undefined;
}

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
      {people.map((person: Person) => {
        const {
          sex,
          born,
          died,
          slug,
          fatherName,
          motherName,
          father,
          mother,
        } = person;

        return (
          <tr
            key={slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': slug === selectedSlug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>
            <td>
              {mother ? <PersonLink person={mother} /> : (motherName ?? '-')}
            </td>
            <td>
              {father ? <PersonLink person={father} /> : (fatherName ?? '-')}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
