import { FC } from 'react';
import classNames from 'classnames';

import { Person } from '../../types';
import { PeopleLink } from '../PeopleLink/PeopleLink';
import { findParent } from '../../helpers/findParent';

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
          } = person;

          const motherOfPerson = findParent(people, motherName);
          const fatherOfPerson = findParent(people, fatherName);

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
                {motherOfPerson ? (
                  <PeopleLink person={motherOfPerson} />
                ) : (
                  motherName || '-'
                )}
              </td>

              <td>
                {fatherOfPerson ? (
                  <PeopleLink person={fatherOfPerson} />
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
