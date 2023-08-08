/*eslint-disable*/
import React from "react";
import { Person } from "../../types";
import classNames from "classnames";
import { Link, useParams } from "react-router-dom";
import { PersonLink } from "../PersonLink";

type Props = {
  person: Person;
  findPerson: (name: string) => Person | null;
};

export const PersonTableRow: React.FC<Props> = ({
  person: people,
}) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({ "has-background-warning": people.slug === slug })}
    >
      <td>
        <Link
          className={classNames({
            "has-text-danger": people.sex === "f",
          })}
          to={people.slug}
        >
          {people.name}
        </Link>
      </td>

      <td>{people.sex}</td>
      <td>{people.born}</td>
      <td>{people.died}</td>
      <td>
        {people.mother ? (
          <PersonLink person={people.mother} />
        ) : (
          people.motherName || "-"
        )}
      </td>
      <td>
        {people.father ? (
          <PersonLink person={people.father} />
        ) : (
          people.fatherName || "-"
        )}
      </td>
    </tr>
  );
};
