import React from "react";
import { Person } from "../types";
import { PersonInfo } from "./PersonInfo";

interface Props {
  peoples: Person[];
}

export const PersonList: React.FC<Props> = ({peoples}) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
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
        {peoples.map(person => (
          <PersonInfo person={person} key={person.name}/>
        ))}
      </tbody>
    </table>
  );
};
