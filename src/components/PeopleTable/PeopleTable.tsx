import React from 'react';
import './PeopleTable.scss';
import classNames from 'classnames';
import { Person } from '../../PersonType';
import { PersonRow } from '../PersonRow';

type Props = {
  people: Person[] | null,
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  let numberLineTable = 0;

  return (
    <div className="PeopleTable">
      <h1 className="PeopleTable__title-page">
        People page
      </h1>
      <table className="PeopleTable__frame">
        <caption className="PeopleTable__title-table">
          Information about members of our cooperative
        </caption>
        <thead className="PeopleTable__head">
          <tr className="PeopleTable__head-row">
            <th className="PeopleTable__head-cell">
              #
            </th>
            <th className="PeopleTable__head-cell">
              Name
            </th>
            <th className="PeopleTable__head-cell">
              Sex
            </th>
            <th className="PeopleTable__head-cell">
              Born
            </th>
            <th className="PeopleTable__head-cell">
              Died
            </th>
            <th className="PeopleTable__head-cell">
              Mother
            </th>
            <th className="PeopleTable__head-cell">
              Father
            </th>
          </tr>
        </thead>

        <tbody className="PeopleTable__body">
          {people && (
            people.map((person) => {
              numberLineTable += 1;

              return (
                <tr
                  className={classNames(
                    'PeopleTable__personRow',
                    {
                      'PeopleTable__personRow--dark': numberLineTable % 2 === 0,
                    },
                  )}
                  key={person.name}
                >
                  <PersonRow
                    line={numberLineTable}
                    person={person}
                  />
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
