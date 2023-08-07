import { PersonItem } from './PersonItem';
import { Person } from './types';

type Props = {
  peoples: Person[],
};

export const PeopleTable = ({ peoples }: Props) => {
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
        {peoples.length < 1 ? (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        ) : (peoples.map((user) => (
          <PersonItem person={user} key={user.slug} />
        )))}
      </tbody>
    </table>
  );
};
