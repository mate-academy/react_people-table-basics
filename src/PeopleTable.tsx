import { PersonRow } from './PersonRow';
import { Person } from './react-app-env';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="PeopleTable Collapse">
      <thead>
        <tr>
          <th className="thead__bold">name   </th>
          <th className="thead__bold">sex   </th>
          <th className="thead__bold">born   </th>
          <th className="thead__bold">died   </th>
          <th className="thead__bold">mother   </th>
          <th className="thead__bold">father   </th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr key={person.slug}>
            <PersonRow person={person} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
