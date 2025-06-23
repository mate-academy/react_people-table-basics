import { PeopleList } from '../PeopleList';

const tableHeaders: string[] = [
  'Name',
  'Sex',
  'Born',
  'Died',
  'Mother',
  'Father',
];

export const PeopleTable = () => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableHeaders.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>

      <PeopleList />
    </table>
  );
};
