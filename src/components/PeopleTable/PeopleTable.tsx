import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[]
  selectedSlug: string
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => (
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
          father,
          fatherName,
          mother,
          motherName,
          slug,
        } = person;
        const isSlugSelected = slug === selectedSlug;
        const preparedMotherName = motherName || '-';
        const preparedFatherName = fatherName || '-';

        return (
          <tr
            data-cy="person"
            key={slug}
            className={classNames(
              { 'has-background-warning': isSlugSelected },
            )}
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
                : preparedMotherName}
            </td>
            <td>
              {father
                ? <PersonLink person={father} />
                : preparedFatherName}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
