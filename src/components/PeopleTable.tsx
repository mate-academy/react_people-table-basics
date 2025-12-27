import PersonLink from './PersonLink';
import { Person } from '../types/Person';

interface PeopleTableProps {
  people: Person[];
  selectedPerson: Person | null;
  setSelectedPerson: (person: Person | null) => void;
}

const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  selectedPerson,
  setSelectedPerson,
}) => {
  const getPersonByName = (name: string | null) =>
    people.find(p => p.name === name) || null;

  return (
    <div className="box table-container">
      <table
        className="table is-striped is-hoverable is-narrow is-fullwidth"
        data-cy="peopleTable"
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
            const isSelected = selectedPerson?.slug === person.slug;
            const mother = getPersonByName(person.motherName);
            const father = getPersonByName(person.fatherName);

            return (
              <tr
                key={person.slug}
                data-cy="person"
                className={isSelected ? 'has-background-warning' : ''}
                onClick={() => {
                  setSelectedPerson(person);
                }}
              >
                <td>
                  <PersonLink person={person} />
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {person.motherName ? (
                    mother ? (
                      <PersonLink person={mother} />
                    ) : (
                      person.motherName
                    )
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {person.fatherName ? (
                    father ? (
                      <PersonLink person={father} />
                    ) : (
                      person.fatherName
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
    </div>
  );
};

export default PeopleTable;
