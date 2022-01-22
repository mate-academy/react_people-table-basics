import { PersonRow } from './PersonRow';
import './PeopleTable.scss';

export const PeopleTable = ({ people }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            Name
          </th>
          <th>
            Sex
          </th>
          <th>
            Born
          </th>
          <th>
            Died
          </th>
          <th>
            Mother
          </th>
          <th>
            Father
          </th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => {
          return (<PersonRow person={person} key={person.slug} />);
        })}
      </tbody>
    </table>
  );
};
