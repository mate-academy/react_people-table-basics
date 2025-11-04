import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
  byName: Map<string, Person>;
  selectedSlug: string;
  onSelectSlug: (slug: string) => void;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  byName,
  selectedSlug,
  onSelectSlug,
}) => {
  const getMother = (p: Person) =>
    p.mother ?? (p.motherName ? byName.get(p.motherName!) : null);

  const getFather = (p: Person) =>
    p.father ?? (p.fatherName ? byName.get(p.fatherName!) : null);

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
        {people.map((p) => {
          const mother = getMother(p);
          const father = getFather(p);

          return (
            <tr
              key={p.slug}
              data-cy="person"
              className={p.slug === selectedSlug ? 'has-background-warning' : ''}
            >
              <td onClick={() => onSelectSlug(p.slug)}>
                <PersonLink person={p} />
              </td>

              <td>{p.sex}</td>
              <td>{p.born}</td>
              <td>{p.died}</td>

              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  p.motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  p.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
