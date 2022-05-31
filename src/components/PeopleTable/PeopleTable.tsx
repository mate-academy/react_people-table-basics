import React from 'react';
import PersonRow from '../PersonRow/PersonRow';
import './PeopleTable.scss';

interface Props {
  people: Person[]
}

const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="people-table table">
      <thead className="table-head">
        <tr className="table-categories">
          <th className="table__name">Name</th>
          <th className="table__sex">Sex</th>
          <th className="table__born">Born</th>
          <th className="table__died">Died</th>
          <th className="table__mother">Mother</th>
          <th className="table__father">Father</th>
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
