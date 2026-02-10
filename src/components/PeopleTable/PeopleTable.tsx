import classNames from 'classnames';
import { Person } from '../../types';
import PersonLink from '../PersonLink/PersonLink';
import { memo } from 'react';

interface Props {
  people: Person[];
  selectedPersonSlug?: string;
}

const PeopleTable = ({ people, selectedPersonSlug }: Props) => {
  const nameToPerson = people.reduce(
    (acc, person) => acc.set(person.name, person),
    new Map<string, Person>(),
  );

  const renderParentCell = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    if (!nameToPerson.has(parentName)) {
      return parentName;
    }

    const parent = nameToPerson.get(parentName)!;

    return <PersonLink person={parent} />;
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
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === selectedPersonSlug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderParentCell(person.motherName)}</td>
            <td>{renderParentCell(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default memo(PeopleTable);
