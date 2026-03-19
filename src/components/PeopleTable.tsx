import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

type PeopleTableProps = {
  people: Person[];
  selectedSlug: string;
};

const PersonLink = ({ person }: { person: Person }) => (
  <Link
    to={`/people/${person.slug}`}
    className={person.sex === 'f' ? 'has-text-danger' : ''}
  >
    {person.name}
  </Link>
);

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
      {people.map(person => {
        const isSelected = selectedSlug === person.slug;
        const motherName = person.motherName;
        const fatherName = person.fatherName;

        const mother =
          motherName && people.find(item => item.name === motherName);
        const father =
          fatherName && people.find(item => item.name === fatherName);

        return (
          <tr
            key={person.slug}
            data-cy="person"
            className={isSelected ? 'has-background-warning' : ''}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {motherName ? (
                mother ? (
                  <PersonLink person={mother} />
                ) : (
                  motherName
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {fatherName ? (
                father ? (
                  <PersonLink person={father} />
                ) : (
                  fatherName
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
