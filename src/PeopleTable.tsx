import React from 'react';

interface User {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
};

type Props = {
  users: User[];
}

export const PeopleTable: React.FC<Props> = ( { users } ) => {
  
  return (
    <table>
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
        {users.map((user: User) => {
          return (
          <tr>
            <td>{user.name}</td>
            <td>{user.sex}</td>
            <td>{user.born}</td>
            <td>{user.died}</td>
            <td>{user.motherName}</td>
            <td>{user.fatherName}</td>
          </tr>)
        })}
      </tbody>
    </table>
  )
};
