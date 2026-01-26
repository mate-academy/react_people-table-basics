import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface PeopleTableProps {
  people: Person[];
  active: Person | undefined;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ people, active }) => (
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
      {(people as Person[]).map((person: Person) => {
        const mother = people.find(p => p.name === person.motherName) || null;
        const father = people.find(p => p.name === person.fatherName) || null;

        return (
          <tr
            key={person.slug}
            data-cy="person"
            className={active === person ? 'has-background-warning' : ''}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {mother ? (
                <PersonLink person={mother} />
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {father ? (
                <PersonLink person={father} />
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
