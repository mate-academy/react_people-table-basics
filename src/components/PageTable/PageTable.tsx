import { Person } from '../../types';
import { PageLink } from '../PageLink';

type Props = {
  people: Person[],
  selectedMan: string | undefined,
};

export const PageTable: React.FC<Props> = ({ people, selectedMan }) => {
  const isSelected = (person: Person) => person.slug === selectedMan;

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
        {people.map((person) => (
          <PageLink
            people={people}
            person={person}
            isSelected={isSelected}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
