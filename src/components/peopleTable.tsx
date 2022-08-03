import { PersonRow } from './personRow';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="table is-bordered">
      <thead>
        <tr>
          <th>name</th>
          <th>sex</th>
          <th>born</th>
          <th>died</th>
          <th>mother</th>
          <th>father</th>
        </tr>
      </thead>
      <tbody>
        {
          people.map(person => (
            <PersonRow person={person} key={person.slug} />
          ))
        }
      </tbody>
    </table>
  );
};
