import React from 'react';
import { PersonRow } from '../PersonRow/PersonRow';
import './PeopleTable.scss';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="table">
      <caption><h2>People</h2></caption>
      <tr>
        <th className="table__tr">Name</th>
        <th className="table__tr">Sex</th>
        <th className="table__tr">Born</th>
        <th className="table__tr">Died</th>
        <th className="table__tr">Mother name</th>
        <th className="table__tr">Father name</th>
      </tr>
      {people.map((person) => <PersonRow key={person.name} person={person} />)}
    </table>
  );
};
