import classNames from 'classnames';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
  selectedPersonSlug: string | null;
  peopleByName: Map<string, Person>;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPersonSlug,
  peopleByName,
}) => {
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
        {people.map(human => {
          const motherPerson = human.motherName
            ? (peopleByName.get(human.motherName) ?? null)
            : null;

          const fatherPerson = human.fatherName
            ? (peopleByName.get(human.fatherName) ?? null)
            : null;

          return (
            <tr
              key={human.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': human.slug === selectedPersonSlug,
              })}
            >
              <td>
                <PersonLink person={human} />
              </td>

              <td>{human.sex}</td>
              <td>{human.born}</td>
              <td>{human.died}</td>

              <td>
                {human.motherName ? (
                  motherPerson ? (
                    <PersonLink person={motherPerson} />
                  ) : (
                    human.motherName
                  )
                ) : (
                  '-'
                )}
              </td>

              <td>
                {human.fatherName ? (
                  fatherPerson ? (
                    <PersonLink person={fatherPerson} />
                  ) : (
                    human.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
