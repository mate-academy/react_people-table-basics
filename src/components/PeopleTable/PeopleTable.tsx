import React from 'react';
import PersonRow from '../PersonRow/PersonRow';
import './PeopleTable.scss';

type Props = {
  people: Person[],
};

const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="PeopleTable">
      <thead>
        <th className="HeaderCell">
          Name
        </th>
        <th className="HeaderCell">
          Sex
        </th>
        <th className="HeaderCell">
          Born
        </th>
        <th className="HeaderCell">
          Died
        </th>
        <th className="HeaderCell">
          Mother
        </th>
        <th className="HeaderCell">
          Father
        </th>
      </thead>

      <tbody>
        {
          people.map(person => <PersonRow person={person} />)
        }
      </tbody>
    </table>
  );
};

export default PeopleTable;
