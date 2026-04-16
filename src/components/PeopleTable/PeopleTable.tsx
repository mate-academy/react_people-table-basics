import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable = ({ people }: Props) => {
  const findEqualName = (parentName: string | null) => {
    if (!parentName) {
      return undefined;
    }

    return people.find(person => person.name === parentName);
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
        {people?.map(person => (
          <PersonLink
            key={person.slug}
            person={person}
            findEqualName={findEqualName}
          />
        ))}
      </tbody>
    </table>
  );
};
