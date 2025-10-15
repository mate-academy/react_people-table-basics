import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface PeopleTableProps {
  people: Person[];
  selectedSlug?: string;
  onSelect: (slug: string) => void;
}

const ParentName: React.FC<{ name: string | null; people: Person[] }> = ({
  name,
  people,
}) => {
  if (!name) {
    return <>-</>;
  }

  const found = people.find(p => p.name.toLowerCase() === name.toLowerCase());

  return <PersonLink person={found || null} name={name} />;
};

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  selectedSlug,
  onSelect,
}) => {
  return (
    <table
      className="table is-striped is-hoverable is-fullwidth"
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
        {people.map(person => (
          <tr
            key={person.slug}
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
            data-cy="person"
          >
            <td>
              <PersonLink
                person={person}
                onClick={() => onSelect(person.slug)}
              />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              <ParentName name={person.motherName} people={people} />
            </td>

            <td>
              <ParentName name={person.fatherName} people={people} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
