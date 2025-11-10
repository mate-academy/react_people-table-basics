import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  function renderParentCell(parentName?: string, parentObj?: Person) {
    if (parentObj) {
      return <PersonLink person={parentObj} />;
    }

    const name = parentName?.trim();

    if (!name) {
      return '-';
    }

    const found = people.find(person => person.name.trim() === name);

    if (found) {
      return <PersonLink person={found} />;
    } else {
      return name;
    }
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
            key={person.slug}
            className={cn({
              'has-background-warning': person.slug === selectedSlug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {renderParentCell(person.motherName ?? undefined, person.mother)}
            </td>
            <td>
              {renderParentCell(person.fatherName ?? undefined, person.father)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
