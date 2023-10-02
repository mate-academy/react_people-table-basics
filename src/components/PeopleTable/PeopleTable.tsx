import classNames from 'classnames';
import { Person } from '../../types';
import { PeopleList } from '../PeopleList';

type Props = {
  people: Person[]
};

export const PeopleTable = ({ people }: Props) => {
  const tableHeaders = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <table
      data-cy="peopleTable"
      className={classNames('table',
        'is-striped',
        'is-hoverable',
        'is-narrow',
        'is-fullwidth')}
    >
      <thead>
        <tr>
          {tableHeaders.map(tableHeader => (
            <th key={tableHeader}>{tableHeader}</th>
          ))}
        </tr>
      </thead>
      <PeopleList people={people} />
    </table>
  );
};
