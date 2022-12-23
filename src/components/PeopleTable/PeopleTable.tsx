import { FC, memo } from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
  selectedSlug: string;
};

export const PeopleTable: FC<Props> = memo(({
  people,
  selectedSlug,
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
        {people.map((person) => {
          const {
            sex,
            born,
            died,
            father,
            mother,
            fatherName,
            motherName,
          } = person;

          const isSelected = (personage: Person) => (
            personage.slug === selectedSlug
          );

          return (
            <tr
              data-cy="person"
              className={classNames({
                'has-background-warning': isSelected(person),
              })}
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
                  : motherName || '-'}
              </td>

              <td>
                {father
                  ? <PersonLink person={father} />
                  : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});
