import { Person } from '../types';
import { PersonLink } from './PersonLink';
interface PeopleTableProps {
  people: Person[];
  selectedName: string | null;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  selectedName,
}) => {
  const findPersonByName = (name: string | null | undefined) => {
    if (!name) {
      return null;
    }

    return people.find(p => p.name === name) || null;
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
        {people.map(person => {
          const isSelected = person.name === selectedName;

          const motherDetails = findPersonByName(person.motherName);
          const fatherDetails = findPersonByName(person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.name}
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {!person.motherName ? (
                  '-'
                ) : motherDetails ? (
                  <PersonLink person={motherDetails} />
                ) : (
                  person.motherName
                )}
              </td>

              <td>
                {!person.fatherName ? (
                  '-'
                ) : fatherDetails ? (
                  <PersonLink person={fatherDetails} />
                ) : (
                  person.fatherName
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
