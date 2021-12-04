import classNames from 'classnames';
import { Person } from '../../types/Person';
import { PersonRow } from '../PersonRow';

import './PeopleTable.scss';

type Props = {
  people: Person[];
  className?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, className }) => {
  return (
    <table className={classNames('PeopleTable', className)}>
      <thead className="PeopleTable__header">
        <tr>
          <th className="PeopleTable__header-data">Name</th>
          <th className="PeopleTable__header-data">Sex</th>
          <th className="PeopleTable__header-data">Born</th>
          <th className="PeopleTable__header-data">Died</th>
          <th className="PeopleTable__header-data">Mother</th>
          <th className="PeopleTable__header-data">Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map((person) => (
          <PersonRow
            key={person.name}
            {...person}
            className="PeopleTable__row"
          />
        ))}
      </tbody>
    </table>
  );
};
