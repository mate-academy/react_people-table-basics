import { PreparedPerson } from '../Types/PreparedPerson';
import { PersonRow } from './PersonRow';

type Props = {
  people: PreparedPerson[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <div className="container">
      <h1 className="title">People table</h1>
      <table className="PeopleTable table is-wide is-fullwidth">
        <th>Name</th>
        <th>Sex</th>
        <th>Born</th>
        <th>Died</th>
        <th>Mother</th>
        <th>Father</th>
        <tbody>
          {people
            .map(person => <PersonRow key={person.slug} person={person} />)}
        </tbody>
      </table>
    </div>
  );
};
