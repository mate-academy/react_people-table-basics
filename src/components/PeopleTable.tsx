import { Person } from '../types';
import { PersonLink } from './PersonLink/PersonLink';

function findPersonByName(
  name: string | null,
  people: Person[],
): Person | undefined {
  return people.find(person => person.name === name);
}

export default function PeopleTable({
  people,
  personSlug,
}: {
  people: Person[];
  personSlug: string | undefined;
}) {
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
        {people.map(person => {
          const mother = findPersonByName(person.motherName, people);
          const father = findPersonByName(person.fatherName, people);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={
                person.slug === personSlug ? 'has-background-warning' : ''
              }
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
}
