import React from 'react';
import { PersonWithParents } from '../../types';
import { PersonRow } from '../PersonRow/PersonRow';
import './PeopleTable.scss';

type Props = {
  people: PersonWithParents[] | null,
};

export const PeopleTable: React.FC<Props> = React.memo(({ people }) => {
  return (
    <div>
      <table className="PeopleTable">
        <thead className="PeopleTable__head">
          <tr className="PeopleTable__row">
            <td className="PeopleTable__cell">
              Name
              <img
                className="PeopleTable__icon"
                src="https://cdn-icons-png.flaticon.com/512/1250/1250689.png"
                width="20px"
                alt="icon for name"
              />
            </td>
            <td className="PeopleTable__cell">Sex</td>
            <td className="PeopleTable__cell">Born</td>
            <td className="PeopleTable__cell">Died</td>
            <td className="PeopleTable__cell">Father</td>
            <td className="PeopleTable__cell">Mother</td>
          </tr>
        </thead>
        {people && (
          <tbody className="PeopleTable__body">
            {people.map(man => (
              <PersonRow
                person={man}
                key={man.name}
              />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
});
