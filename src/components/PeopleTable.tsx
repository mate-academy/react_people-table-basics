import { Person } from '../types/Person';
import { Link } from 'react-router-dom';

type Props = {
  people: Person[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
  name?: string;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  onSelect,
  name = '',
}) => {
  const normalize = (s: string) => s.trim().toLowerCase();

  const personByName = people.find(
    p => normalize(p.name) === normalize(name || ''),
  );

  return (
    <div>
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
        person.slug === selectedSlug
          ? 'has-background-warning'
          : personByName && person.slug === personByName.slug
          ? 'has-background-info'
          : ''
      }
            >
              <td>
                <Link
                  to={`/people/${person.slug}`}
                  onClick={() => onSelect(person.slug)}
                  className={
                    person.sex === 'f' ? 'has-text-danger' : 'has-text-info'
                  }
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{person.motherName || '-'}</td>
              <td>{person.fatherName || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
