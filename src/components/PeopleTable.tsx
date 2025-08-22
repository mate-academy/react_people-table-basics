import { Person } from '../types';
import PersonLink from './PersonLink';
import classNames from 'classnames';

type Props = {
  people: Person[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
};

function PeopleTable({ people, selectedSlug, onSelect }: Props) {
  const peopleMap = new Map(people.map(p => [p.name, p]));

  const getPersonCell = (name: string | null): string | JSX.Element => {
    if (!name) {
      return '-';
    }

    const person = peopleMap.get(name);

    return person ? <PersonLink person={person} /> : name;
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
          const { sex, born, died, fatherName, motherName, slug } = person;
          const isSelected = selectedSlug === slug;

          return (
            <tr
              key={slug}
              className={classNames({
                'has-background-warning': isSelected,
              })}
              data-cy="person"
              onClick={() => onSelect(slug)}
              style={{ cursor: 'pointer' }}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{getPersonCell(motherName)}</td>
              <td>{getPersonCell(fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default PeopleTable;
