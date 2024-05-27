import {Person} from "../../types";
import React from "react";
import PersonLink from "../../links/PersonLink";

type Props = {
  people: Person[];
  selectedPersonSlug: string | undefined;
}

const PeopleTable:React.FC<Props> = ({ people, selectedPersonSlug }) => {
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
      {people.map(person => (
        <tr
          key={person.slug}
          data-cy="person"
          className={person.slug === selectedPersonSlug ? "has-background-warning" : ""}
        >
          <td>
            <PersonLink person={person}/>
          </td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>
            {people.find(dude => person.motherName === dude.name) ? (
              <PersonLink
                person={people.find(p => p.name === person.motherName)!}
              />
            ) : person.motherName ? (
              person.motherName
            ) : (
              '-'
            )}
          </td>
          <td>
            {people.find(dude => person.fatherName === dude.name) ? (
              <PersonLink
                person={people.find(p => p.name == person.fatherName)!}
              />
            ) : person.fatherName ? (
              person.fatherName
            ) : (
              '-'
            )}
          </td>
        </tr>
      ))}
      </tbody>
    </table>

  );
};

export default PeopleTable;

