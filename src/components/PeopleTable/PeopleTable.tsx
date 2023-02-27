import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
  selectedSlug: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
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
          const {
            sex,
            born,
            died,
            slug,
            motherName,
            fatherName,
            mother,
            father,
          } = person;

          const isSelectedPerson = selectedSlug === slug;
          const editedMotherName = motherName || '-';
          const editedFatherName = fatherName || '-';

          return (
            <tr
              key={slug}
              data-cy="person"
              className={cn({ 'has-background-warning': isSelectedPerson })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? <PersonLink person={mother} />
                  : editedMotherName}
              </td>
              <td>
                {father
                  ? <PersonLink person={father} />
                  : editedFatherName}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
