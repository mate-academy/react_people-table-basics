import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface PeopleTableProps {
  people: Person[];
  selectedPersonSlug: string;
}
export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  selectedPersonSlug,
}) => {
  const findPersonByName = (name: string | null) => {
    return people.find(person => person.name === name);
  };

  return (
    <div className="block">
      <div className="box table-container">
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
                  person.slug === selectedPersonSlug
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
                  {person.motherName ? (
                    people.find(p => p.name === person.motherName) ? (
                      <PersonLink
                        person={findPersonByName(person.motherName) || null}
                      />
                    ) : (
                      person.motherName
                    )
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {person.fatherName ? (
                    people.find(p => p.name === person.fatherName) ? (
                      <PersonLink
                        person={findPersonByName(person.fatherName) || null}
                      />
                    ) : (
                      person.fatherName
                    )
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
