import classNames from 'classnames';
import { FC } from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  persons: Person[],
  selectedSlug: string | undefined,
};

export const PeopleTable: FC<Props> = ({ persons, selectedSlug }) => {
  const isSelected = (person: Person) => person.slug === selectedSlug;

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
        {persons.map(person => {
          const {
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = person;

          const mother = persons.find(per => per.name === person.motherName);
          const father = persons.find(per => per.name === person.fatherName);

          return (
            <tr
              key={person.slug}
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
                {
                  mother
                    ? <PersonLink person={mother} />
                    : motherName || '-'
                }
              </td>
              <td>
                {
                  father
                    ? <PersonLink person={father} />
                    : fatherName || '-'
                }
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
