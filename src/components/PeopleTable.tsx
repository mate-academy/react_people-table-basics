import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable = ({ people, selectedSlug }: Props) => {
  const findPerson = (name: string | null) =>
    name ? people.find(person => person.name === name) || null : null;

  return (
    <table
      className="table is-striped is-hoverable is-fullwidth"
      data-cy="peopleTable"
    >
      {' '}
      <thead>
        {' '}
        <tr>
          {' '}
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>{' '}
        </tr>{' '}
      </thead>{' '}
      <tbody>
        {people.map(person => {
          const isSelected = person.slug === selectedSlug;
          const rowClass = isSelected ? 'has-background-warning' : undefined;

          return (
            <tr key={person.slug} className={rowClass} data-cy="person">
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died ?? '-'}</td>
              <td>
                {person.motherName ? (
                  <PersonLink
                    person={findPerson(person.motherName)}
                    name={person.motherName}
                  />
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  <PersonLink
                    person={findPerson(person.fatherName)}
                    name={person.fatherName}
                  />
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
};
