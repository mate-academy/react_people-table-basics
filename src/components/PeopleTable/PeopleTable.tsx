import classNames from "classnames";
import React from "react";
import { Person } from "../../types";
import { PersonNavLink } from "../PersonLink";

type Props = {
  people: Person[],
  slug: string,
};

export const PeopleTable: React.FC<Props> = ({ people, slug }) => {
  if (!people) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

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
        {people.map((person) => {
          const father = people
            .find(father => father.name === person.fatherName);
          const mother = people
          .find(mother => mother.name === person.motherName);
          const SelectedPerson = person.slug === slug;

          return (
            <tr
              className={classNames({ 'has-background-warning': SelectedPerson })}
              data-cy="person"
            >
              <td>
                <PersonNavLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {mother
                  ? (
                    <PersonNavLink person={mother} />
                ) : (
                    person.motherName || '-'
                )}
              </td>

              <td>
                {father
                  ? (
                    <PersonNavLink person={father} />
                  ) : (
                    person.fatherName || '-'
                  )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
