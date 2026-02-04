import { Person } from '../types/Person';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable = ({ people, selectedSlug }: Props) => {
  const findByName = (name?: string | null) =>
    people.find(p => p.name === name);

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
          const isSelected = selectedSlug === person.slug;

          const renderParent = (parentName: string | null) => {
            if (!parentName) {
              return '-';
            }

            const parent = findByName(parentName);

            if (!parent) {
              return parentName;
            }

            return (
              <a
                href={`#/people/${parent.slug}`}
                className={parent.sex === 'f' ? 'has-text-danger' : undefined}
              >
                {parent.name}
              </a>
            );
          };

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : undefined}
            >
              <td>
                <a
                  href={`#/people/${person.slug}`}
                  className={person.sex === 'f' ? 'has-text-danger' : undefined}
                >
                  {person.name}
                </a>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>{renderParent(person.motherName)}</td>
              <td>{renderParent(person.fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PeopleTable;
