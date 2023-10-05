import { Person } from '../../types';
import { PersonRow } from '../Person/PersonRow';

type PeopleTableProps = {
  people: Person[]
  clickedPersonSlug?: string
};

export const PeopleTable = (
  { people, clickedPersonSlug }: PeopleTableProps,
) => {
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
          const child = { ...person };

          child.father = people.find(
            father => father.name === child.fatherName,
          );

          child.mother = people.find(
            mother => mother.name === child.motherName,
          );

          return (
            <PersonRow
              key={child.slug}
              person={child}
              clickedPersonSlug={clickedPersonSlug}
            />
          );
        })}
      </tbody>
    </table>
  );
};
