import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';

interface PeopleTableProps {
  people: Person[];
  slug?: string;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ people, slug }) => {
  return (
    <>
      <h1 className="title">People Page</h1>

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
              className={slug === person.slug ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink name={person.name} people={people} />
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
    </>
  );
};
