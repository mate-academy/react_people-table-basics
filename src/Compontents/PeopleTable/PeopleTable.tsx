import { Person } from '../../types/Person';
import { PersonRow } from '../PersonRow/PersonRow';
import './PeopleTable.scss';

type Props = {
  humans: Person[];
};

export const PeopleTable: React.FC<Props> = ({ humans }) => {
  return (
    <table className="PeopleTable">
      {humans.map(human => (
        <PersonRow person={human} />
      ))}
    </table>
  );
};
