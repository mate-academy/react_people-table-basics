import PeopleItem from '../PeopleItem';
import {getPeople } from '../../api';

export const PeopleList = () => {
  const [peoples]

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
        <PeopleItem />
      </tbody>
    </table>
  );
};
