import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedPerson: Person | null;
  onSelectPerson: (person: Person) => void;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPerson,
  onSelectPerson,
}) => {
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
          const mother = people.find(p => p.name === person.motherName) ?? null;
          const father = people.find(p => p.name === person.fatherName) ?? null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              onClick={event => {
                if ((event.target as HTMLElement).closest('a')) {
                  return;
                }

                onSelectPerson(person);
              }}
              className={
                selectedPerson?.slug === person.slug
                  ? 'has-background-warning'
                  : ''
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
};
