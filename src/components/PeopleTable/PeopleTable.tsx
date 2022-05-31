import React from 'react';
import PersonRow from '../PersonRow/PersonRow';
import './PeopleTable.scss';

interface Props {
  people: Person[]
}

const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="people-table table">
      <thead className="table__head">
        <tr className="table__categories categories">
          <th className="categories__item">Name</th>
          <th className="categories__item">Sex</th>
          <th className="categories__item">Born</th>
          <th className="categories__item">Died</th>
          <th className="categories__item">Mother</th>
          <th className="categories__item">Father</th>
        </tr>
      </thead>

      <tbody className="table-body">
        {people.map(person => (
          <PersonRow
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
