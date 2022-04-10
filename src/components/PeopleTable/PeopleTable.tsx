import { FullPerson } from '../../types/Person';
import { PersonRow } from '../PersonRow/PersonRow';

export const PeopleTable: React.FC<Props> = ({ people }) => {
  // eslint-disable-next-line no-console

  return (
    <table className="people__table table is-bordered">
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
        {people.map(person => <PersonRow key={person.slug} person={person} />)}
      </tbody>
    </table>
  );
};

interface Props {
  people: FullPerson[],
}
