import { FC } from 'react';
import classNames from 'classnames';

import { Person } from '../../types';
import { PeopleLink } from '../PeopleLink';

export type Props = {
  people: Person[],
  personId: string,
};

export const PeopleTable: FC<Props> = (props) => {
  const {
    people,
    personId,
  } = props;

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
            motherName,
            fatherName,
            slug,
            mother,
            father,
          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': slug === personId,
              })}
            >
              <td>
                <PeopleLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {mother ? (
                  <PeopleLink person={mother} />
                ) : (
                  motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <PeopleLink person={father} />
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
