import { FC } from 'react';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = ({ people }) => (
  <table className="table is-narrow table is-hoverable table is-fullwidth">
    <thead>
      <tr>
        <th>Name</th>
        <th>Sex</th>
        <th>Born</th>
        <th>Died</th>
        <th>Father</th>
        <th>Mother</th>
      </tr>
    </thead>

    <tbody>
      {people.map((user) => (
        <tr key={user.slug}>
          <td>{user.name}</td>
          <td>{user.sex}</td>
          <td>{user.born}</td>
          <td>{user.died}</td>
          <td>{user.fatherName}</td>
          <td>{user.motherName}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
