import React from "react";
import { Link } from "react-router-dom";
import { Person } from "../types";
import classNames from "classnames";

type Props = {
  person: Person;
  isLink?: boolean;
}

export const PersonLink: React.FC<Props> = ({
  person,
}) => (
  <Link
    to={`../${person.slug}`}
    className={
      classNames({
        'has-text-danger': person.sex === 'f',
    })}
  >
    {person.name}
  </Link>
  );
