import React from 'react';
import { PersonRow } from '../PersonRow';
import './PeopleTable.scss';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = (props) => {
  const { people } = props;
  const tableHead = Object.keys(people[0]);

  return (
    <table className="PeopleTable container">
      <thead className="PeopleTable__head">
        <tr className="PeopleTable__row">
          {tableHead.map(title => (
            title !== 'motherName' 
            && title !== 'fatherName'
            && title !== 'slug') && (
              <th
                key={title}
                className="PeopleTable__title"
              >
                {title.toUpperCase()}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <PersonRow
            person={person}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
