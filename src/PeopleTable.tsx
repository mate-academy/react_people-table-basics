import { PersonRow } from './PersonRow';
import { Person } from './type';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC <Props> = ({ people }) => {
  return (
    <table className="PeopleTable">
      <tr className="table__row-title">
        <th className="table__column-title">name</th>
        <th className="table__column-title">sex</th>
        <th className="table__column-title">born</th>
        <th className="table__column-title">died</th>
        <th className="table__column-title">mother</th>
        <th className="table__column-title">father</th>
      </tr>

      {people.map((person) => (
        <tr
          className="table__row-title"
          key={person.name}
        >
          <PersonRow title={person.name} />
          <PersonRow title={person.sex} />
          <PersonRow title={person.born} />
          <PersonRow title={person.died} />
          <PersonRow title={person.motherName || 'no data'} />
          <PersonRow title={person.fatherName || 'no data'} />
        </tr>
      ))}
    </table>
  );
};
