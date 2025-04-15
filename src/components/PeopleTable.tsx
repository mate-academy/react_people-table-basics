import { TableItem } from './TableItem';

export const PeopleTable = ({ peoples, selectedSlug }) => {
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
        {peoples.map(people => {
          const mother = peoples.find(
            woman => woman.name === people.motherName,
          );
          const father = peoples.find(man => man.name === people.fatherName);

          return (
            <TableItem
              people={people}
              key={people.slug}
              selectedSlug={selectedSlug}
              mother={mother}
              father={father}
            />
          );
        })}
      </tbody>
    </table>
  );
};
