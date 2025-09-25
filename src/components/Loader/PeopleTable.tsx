import classNames from "classnames";
import React from "react";
import { Person } from "../../types";
import { PersonLink } from "./PersonLink";
import { useParams } from "react-router-dom";

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slugPerson } = useParams();

  const findPerson = (personName: string | null) => {
    const foundPerson = people.find(person => person.name === personName);

    return foundPerson ? (
      <PersonLink person={foundPerson} />
    ) : (
      personName || '-'
    );
  };

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
            className={classNames({
              'has-background-warning': person.slug === slugPerson,
            })}
            data-cy="person"
            key={person.name}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{findPerson(person.motherName)}</td>
            <td>{findPerson(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
