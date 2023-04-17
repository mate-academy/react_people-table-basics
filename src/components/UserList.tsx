import classNames from 'classnames';
import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  users: Person[];
  personId: string;
};

const findParent = (
  array: Person[],
  parentName: string | null,
): Person | null => {
  return array.find((parent) => parent.name === parentName) || null;
};

export const UserList: React.FC<Props> = ({ users, personId }) => {
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
        {users.map((user) => {
          const mother = findParent(users, user.motherName);
          const father = findParent(users, user.fatherName);

          return (
            <tr
              data-cy="person"
              key={user.slug}
              className={classNames({
                'has-background-warning': user.slug === personId,
              })}
            >
              <td>
                <PersonLink person={user} />
              </td>
              <td>{user.sex}</td>
              <td>{user.born}</td>
              <td>{user.died}</td>
              <td>
                {mother
                  ? <PersonLink person={mother} />
                  : user.motherName || '-'}
              </td>
              <td>
                {father
                  ? <PersonLink person={father} />
                  : user.fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
