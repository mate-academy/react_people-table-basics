import 'bulma/css/bulma.min.css';
import { PersonRow } from '../PersonRow/PersonRow';
import './peopleTable.scss';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <>
      <table className="PeopleTable table">
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
            <PersonRow key={person.slug} person={person} />
          ))}
        </tbody>
      </table>
    </>
  );
};
