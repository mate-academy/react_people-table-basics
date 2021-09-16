import React from "react";
import { uuid } from 'uuidv4';
import { PersonRow } from "../PersonRow";
import './PeopleTable.scss';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = (props) => {
  const { people } = props;
  return (
    <table className="people-table table table-light table-striped">
      <thead>
      <tr>
        <th>Name</th>
        <th>Sex</th>
        <th>Born</th>
        <th>Died</th>
        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
    <tbody>
      {people.map(person => (
        <PersonRow key={uuid()} person={person} />
      ))}
    </tbody>
    </table>
  )
}
