import React from 'react';
import { PersonRow } from './PersonRow';

export const PeopleTable:
React.FC<{ peopleFromServer: UserFromServerType[] }> = ({ peopleFromServer }) => (
  <table style={{ borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        <td>Name</td>
        <td>Sex</td>
        <td>born</td>
        <td>died</td>
        <td>mother</td>
        <td>father</td>
      </tr>
    </thead>
    <tbody>
      {peopleFromServer.map((user: UserFromServerType) => (
        <PersonRow key={user.slug} person={user} />
      ))}
    </tbody>
  </table>
);
