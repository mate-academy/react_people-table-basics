import { Person } from '../../types/Person';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink';

export const PeopleTable = ({
  isLoading,
  people,
  selectedSlug,
}: {
  isLoading: boolean;
  people: Person[];
  selectedSlug?: string;
}) => {
  if (isLoading) {
    return <Loader />;
  }

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
            key={person.name}
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink name={person.name} allPeople={people} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink name={person.motherName || ''} allPeople={people} />
            </td>
            <td>
              <PersonLink name={person.fatherName || ''} allPeople={people} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
