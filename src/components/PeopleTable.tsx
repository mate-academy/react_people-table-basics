import classNames from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';
import { Person } from '../types';

type Props = {
  personId: string,
  peoples: Person[],
};

export const PeopleTable: React.FC<Props> = ({ personId, peoples }) => {
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
        {peoples.map((people) => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
          } = people;

          const mother = peoples.find((person) => person.name === motherName);
          const father = peoples.find((person) => person.name === fatherName);

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames(
                { 'has-background-warning': slug === personId },
              )}
            >
              <td>
                <PersonLink person={people} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
