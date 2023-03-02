import React from 'react';

import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  people: Person[]
  personSlug: string
}

export const PeopleTable: React.FC<Props> = React.memo(
  ({ people, personSlug }) => {
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
              mother,
              motherName,
              father,
              fatherName,
              slug,
            } = person;

            const mom = motherName || '-';
            const dad = fatherName || '-';

            return (
              <tr
                key={slug}
                data-cy="person"
                className={classNames({
                  'has-background-warning': personSlug === slug,
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
                    : mom}
                </td>
                <td>
                  {father
                    ? <PersonLink person={father} />
                    : dad}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  },
);
