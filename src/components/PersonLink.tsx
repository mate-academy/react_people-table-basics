/* eslint-disable prettier/prettier */
import { Link } from "react-router-dom";
import { Person } from "../types";

export const PersonLink = ({ person }: { person: Person }) => {
  const isFemale = person.sex === 'f';

  return (
    <Link
      to={`/people/${person.slug}`}
      className={isFemale ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};

