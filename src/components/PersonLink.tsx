import { Link } from "react-router-dom";
import { Person } from "../types";

interface PersonLinkProps {
  person?: Person;
  name?: string | null;
}

export const PersonLink = ({ person, name }: PersonLinkProps) => {
  if (person) {
    return (
      <Link
        to={`/people/${person.slug}`}
        className={person.sex === 'f' ? 'has-text-danger' : ''}
      >
        {person.name}
      </Link>
    );
  }

  if (name) {
    return <>{name}</>;
  }

  return <>-</>;
};