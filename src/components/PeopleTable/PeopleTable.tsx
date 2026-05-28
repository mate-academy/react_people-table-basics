import classNames from 'classnames';

import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';

interface PeopleTableProps {
  people: Person[];
  selectedPerson: Person | null;
}

export function PeopleTable({ people, selectedPerson }: PeopleTableProps) {
  const getPersonByName = (name: string | null) => {
    if (!name) {
      return null;
    }

    return people.find(person => person.name === name) || null;
  };

  const renderFamilyMember = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const person = getPersonByName(name);

    if (!person) {
      return name;
    }

    return <PersonLink person={person} />;
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
            className={classNames({
              'has-background-warning': selectedPerson?.slug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderFamilyMember(person.motherName)}</td>
            <td>{renderFamilyMember(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
