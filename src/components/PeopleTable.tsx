import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
type PeopleTableProps = {
  people: Person[];
};

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { slug: selectedSlug } = useParams();
  const renderPerson = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const foundPerson = people.find(p => p.name === name);

    if (foundPerson) {
      return <PersonLink person={foundPerson} />;
    }

    return name;
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
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderPerson(person.motherName)}</td>
            <td>{renderPerson(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
