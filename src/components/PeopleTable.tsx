import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable = ({ people, selectedSlug }: Props) => (
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
            <PersonLink person={person} />
          </td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>
            {person.mother ? (
              <PersonLink person={person.mother} />
            ) : (
              person.motherName || '-'
            )}
          </td>
          <td>
            {person.father ? (
              <PersonLink person={person.father} />
            ) : (
              person.fatherName || '-'
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
