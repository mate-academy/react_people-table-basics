/* eslint-disable react/jsx-filename-extension */

import { Person } from '../Person/Person';

export const PeopleTable = ({ people }) => {
  return (
    <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
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
        {people.map(person => <Person person={person} />)}
      </tbody>
    </table>
  );
};
