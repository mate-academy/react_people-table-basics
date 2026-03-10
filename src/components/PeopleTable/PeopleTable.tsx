import type { Person } from '../../types/Person';
import PersonLink from '../PersonLink/PersonLink';
import { useParams } from 'react-router-dom';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const peopleByName = new Map(people.map(person => [person.name, person]));
  const getParentCell = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parent = peopleByName.get(parentName);

    return parent ? <PersonLink person={parent} /> : parentName;
  };

  return (
    <table data-cy="peopleTable" className="table is-striped">
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
            key={person.slug}
            className={slug === person.slug ? 'has-background-warning' : ''}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>{getParentCell(person.motherName)}</td>
            <td>{getParentCell(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
