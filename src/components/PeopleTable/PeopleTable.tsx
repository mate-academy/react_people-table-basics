import { Person } from '../../types';
import { PeopleList } from '../PeopleList';

interface Props {
  people: Person[];
}

const tableHeadItems = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableHeadItems.map(item => (
            <th key={item}>{item}</th>
          ))}
        </tr>
      </thead>

      <PeopleList people={people} />
    </table>
  );
};
