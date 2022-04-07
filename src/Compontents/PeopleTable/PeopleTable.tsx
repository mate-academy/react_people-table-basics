import { Person } from '../../types/Person';
import { PersonRow } from '../PersonRow/PersonRow';
import './PeopleTable.scss';

type Props = {
  humans: Person[];
};

export const PeopleTable: React.FC<Props> = ({ humans }) => {
  return (
    <table className="PeopleTable">
      <tbody>
        {humans.map(human => (
          <tr className="PeopleTable__person" key={human.id}>
            <PersonRow person={human} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
