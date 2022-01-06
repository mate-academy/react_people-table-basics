import React from 'react';
import { PeopleRow } from '../PeopleRow/PeopleRow';
import { Person } from '../../../types/Person';

import './PeopleTable.scss';

interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <div className="peopleTable">
      <h1 className="peopleTable__header">
        PEOPLE
      </h1>

      <table className="peopleTable__table">
        <thead className="peopleTable__table__head">
          <tr>
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody className="peopleTable__people">
          {people.map(person => (
            <PeopleRow
              person={person}
              key={person.slug}
            />
          ))}
        </tbody>
      </table>

      <button
        className="peopleTable__return-to-top"
        type="button"
        onClick={() => window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })}
      >
        &#8682;
      </button>
    </div>
  );
};
