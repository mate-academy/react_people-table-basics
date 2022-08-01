import { PeopleRow } from './PeopleRow';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table className="table is-narrow is-fullwidth PeopleTable">
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
      {people.map(person => (
        <PeopleRow person={person} key={person.slug} />
      ))}
    </tbody>
  </table>
);
