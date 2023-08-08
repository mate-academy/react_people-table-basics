import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Table = {
  people: Person[],
};

export const PeopleTable: React.FC<Table> = ({
  people,
}) => {
  const personFind = (name: string | null) => {
    return people.find(person => person.name === name);
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
          <PersonLink
            key={person.slug}
            person={person}
            personFind={personFind}
          />
        ))}
      </tbody>
    </table>
  );
};
