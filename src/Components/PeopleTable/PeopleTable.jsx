import React from 'react';

import { PersonRow } from '../PersonRaw';

export const PeopleTable = () => {


  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Sex</td>
            <td>Born</td>
            <td>Died</td>
            <td>Mother</td>
            <td>Father</td>
          </tr>
        </thead>
        <tbody>
          <PersonRow />
        </tbody>
      </table>
    </>
  );
}
