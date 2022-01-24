import { IPeopleWithParents } from '../../entities/IPeople';
import './PeopleTable.scss';

type Props = {
  people: IPeopleWithParents[];
};

const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table
      className="PeopleTable"
      cellPadding="5"
      cellSpacing="5"
    >
      <thead>
        <tr className="PeopleRow">
          <th className="PeopleColumn">Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
        {people.map((person) => {
          return (
            <tr>
              <th>{person.name}</th>
              <th>{person.sex}</th>
              <th>{person.born}</th>
              <th>{person.died}</th>
              <th>{person.motherName || 'Unknown'}</th>
              <th>{person.fatherName || 'Unknown'}</th>
            </tr>
          );
        })}
      </thead>
    </table>
  );
};

export default PeopleTable;
