import React from 'react';
import { Person } from '../../Types/Types';
import { TableRow } from '../TableRow/TableRow';

type Props = {
  people: Person[],
};

const tableHead = [
  'Name', 'Sex', 'Born', 'Died', 'Father Name', 'Mother Name', 'Slug',
];

export const Table: React.FC<Props> = ({ people }) => {
  return (
    <div className="mdc-data-table">
      <div className="mdc-data-table__table-container">
        <table className="mdc-data-table__table" aria-label="Dessert calories">
          <thead>
            <tr className="mdc-data-table__header-row">
              {tableHead.map(item => (
                <th
                  className="mdc-data-table__header-cell"
                  role="columnheader"
                  scope="col"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="mdc-data-table__content">
            {people.map(person => (
              <tr key={person.slug} className="mdc-data-table__row Person">
                <TableRow person={person} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
