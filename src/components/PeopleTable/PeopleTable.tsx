import { PersonLink } from '../PersonLink/PersonLink';
import { usePeople } from '../context/PeopleContext';

export const PeopleTable: React.FC = () => {
  const columns = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];
  const { people } = usePeople();

  const preparedPeople = people.map(person => ({
    ...person,
    mother: people.find(per => per.name === person.motherName),
    father: people.find(per => per.name === person.fatherName),
  }));

  return (
    <div className="block">
      <div className="box table-container">
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {columns.map(name => (
                <th key={name}>{name}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {preparedPeople.map(person => (
              <PersonLink key={person.slug} person={person} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
