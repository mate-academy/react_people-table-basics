import { PersonLink } from './PersonLink';
import { Person } from '../types/Person';

interface PeopleTableProps {
  people: Person[];
  selectedSlug: string;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  selectedSlug,
}) => (
  <div className="block">
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
        {people.map(p => {
          const mother = people.find(x => x.name === p.motherName);
          const father = people.find(x => x.name === p.fatherName);
          const isSelected = p.slug === selectedSlug;

          return (
            <tr
              key={p.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={p} />
              </td>
              <td>{p.sex}</td>
              <td>{p.born}</td>
              <td>{p.died}</td>
              <td>
                {p.motherName ? (
                  mother ? (
                    <PersonLink person={mother} />
                  ) : (
                    <span>{p.motherName}</span>
                  )
                ) : (
                  <span>-</span>
                )}
              </td>

              <td>
                {p.fatherName ? (
                  father ? (
                    <PersonLink person={father} />
                  ) : (
                    <span>{p.fatherName}</span>
                  )
                ) : (
                  <span>-</span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
