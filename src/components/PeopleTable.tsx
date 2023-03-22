import { findParent } from '../helper';
import { Person } from '../types';
import { Parents } from '../types/Parents';
import { PersonLink } from './PersonLink';

type PeopleTableProps = {
  peoples: Person[];
  selectedSlug: string;
};

export const PeopleTable: React.FC<PeopleTableProps> = ({
  peoples,
  selectedSlug,
}) => {
  return (
    <table
      data-cy="peopleTable"
      className="
        table
        is-striped
        is-hoverable
        is-narrow
        is-fullwidth
      "
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
        {peoples.map(person => {
          const {
            slug,
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = person;
          const isPersonSelected = slug === selectedSlug;
          const personsMom = findParent(peoples, person, Parents.Mother);
          const personsDad = findParent(peoples, person, Parents.Father);

          return (
            <tr
              key={slug}
              data-cy="person"
              className={isPersonSelected
                ? 'has-background-warning'
                : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {personsMom ? (
                  <PersonLink person={personsMom} />
                ) : (
                  motherName || '-'
                )}
              </td>

              <td>
                {personsDad ? (
                  <PersonLink person={personsDad} />
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
