import { Person } from '../types';
import { getPreparedPeopleInfo } from './preparedPeopleInfo';
import { PersonInfo } from './PersonInfo';

const tableValues = [
  'Name',
  'Sex',
  'Born',
  'Died',
  'Mother',
  'Father',
];

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const PreparedPeopleInfo = getPreparedPeopleInfo(people);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableValues.map(columnValue => (
            <th key={columnValue}>{columnValue}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {PreparedPeopleInfo.map(person => (
          <PersonInfo person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
