import React from 'react';
import { PersonWithParents } from '../../types';
import { PersonRow } from '../PersonRow';
import './peopleTable.scss';

type Props = {
  people: PersonWithParents[] | null,
};

export const PeopleTable: React.FC<Props> = React.memo(({ people }) => {
  return (
    <div>
      <table className="PeopleTable">
        <thead className="PeopleTable__head">
          <tr className="PeopleTable__row">
            <td className="PeopleTable__cell">Name</td>
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
