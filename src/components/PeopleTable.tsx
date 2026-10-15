import type { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

type PeopleTableProps = {
  people: Person[];
  slug: string | undefined;
};

const renderParent = (people: Person[], parentName: string | null) => {
  const parent = people.find(person => person.name === parentName);

  if (parent) {
    return <PersonLink person={parent} />;
  }

  return parentName || '-';
};

export const PeopleTable = ({ people, slug }: PeopleTableProps) => {
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
            className={slug === person.slug ? 'has-background-warning' : ''}
            key={person.slug}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderParent(people, person.motherName)}</td>
            <td>{renderParent(people, person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
