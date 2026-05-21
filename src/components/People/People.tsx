import React from "react";
import { Person } from "../../types";
import classNames from "classnames";
import { Link } from "react-router-dom";

type Props = {
  people: Person[];
  selectedPersonSlug: string;
};

export const People: React.FC<Props> = ({ people, selectedPersonSlug }) => {
  return (
    <div className="block">
      <div className="box table-container">
        {!people && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

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
              const motherInList = people.find(
                (per) => per.name === person.motherName,
              );
              const fatherInList = people.find(
                (per) => per.name === person.fatherName,
              );

              return (
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={classNames({
                    "has-background-warning":
                      person.slug === selectedPersonSlug,
                  })}
                >
                  <td>
                    <Link
                      className={classNames({
                        "has-text-danger": person.sex === "f",
                      })}
                      to={`/people/${person.slug}`}
                    >
                      {person.name}
                    </Link>
                  </td>
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {motherInList ? (
                      <Link
                        to={`/people/${motherInList.slug}`}
                        className={classNames({
                          "has-text-danger": motherInList.sex === "f",
                        })}
                      >
                        {person.motherName}
                      </Link>
                    ) : (
                      person.motherName || "-"
                    )}
                  </td>
                  <td>
                    {fatherInList ? (
                      <Link to={`/people/${fatherInList.slug}`}>
                        {person.fatherName}
                      </Link>
                    ) : (
                      person.fatherName || "-"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
