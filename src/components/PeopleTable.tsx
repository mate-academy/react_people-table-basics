import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable = ({ people, selectedSlug }: Props) => {
  const getPersonByName = (name: string | null | undefined) => {
    if (!name) {
      return null;
    }

    return people.find(person => person.name === name) ?? null;
  };

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
            key={person.slug}
            data-cy="person"
            className={selectedSlug === person.slug ? 'has-background-warning' : undefined}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink
                person={getPersonByName(person.motherName)}
                fallback={person.motherName || '-'}
              />
            </td>
            <td>
              <PersonLink
                person={getPersonByName(person.fatherName)}
                fallback={person.fatherName || '-'}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
